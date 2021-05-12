const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/', function (req, response) {
    let token = req;
    let { bill_id } = req.body
    if (token) {
        decode(token).then(res => {
            let { email_id, name } = res
            let stmt = 'select session_state from session_mgmt where email_id = ?'
            connection.query(stmt, email_id, (err, rows, fields) => {
                if (err) {
                    let data = {
                        "msg": "Unauthorized",
                        "code": 401
                    }
                    response.status(401).send(data)
                }
                else if (rows.length > 0) {
                    let loggedin = rows[0].session_state
                    if (loggedin === 'loggedin') {
                        let stmt = 'select bills.payment_status,bills.payment_date,user_info.address_line1,user_info.address_line2,user_info.phone_no,bill_items.item_name,bill_items.quantity,bill_items.amount from bills inner join user_info on bills.user_id=user_info.user_id inner join bill_items on bills.bill_id=bill_items.bill_id  where bills.bill_id=?'
                        connection.query(stmt, bill_id, function (err, rows, fields) {
                            if (err) {
                                console.log("error", err)
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.affectedRows === 0) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else {
                                let data1 = {
                                    "item_name": rows[0].item_name,
                                    "Quantity": rows[0].quantity,
                                    "Amount": rows[0].amount
                                }
                                let data2 = {
                                    "items_value": data1,
                                    "bill_id": bill_id,
                                    "payment_date": rows[0].payment_date,
                                    "payment_status": rows[0].payment_status,
                                    "name": name,
                                    "address1": rows[0].address_line1,
                                    "address2": rows[0].address_line2,
                                    "phone": rows[0].phone_no,
                                    "email_id": email_id
                                }
                                let data = {
                                    "msg": "success",
                                    "data": data2,
                                    "code": 200
                                }
                                response.send(data)

                            }
                        })
                    }
                    else {
                        let data = {
                            "msg": "Unauthorized",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                }
                else {
                    let data = {
                        "msg": "Unauthorized",
                        "code": 401
                    }
                    response.status(401).send(data)
                }
            })
        }).catch(err => {
            let data = {
                "msg": "Unauthorized",
                "code": 401
            }
            response.status(401).send(data)
        })

    }
    else {
        let data = {
            "msg": "Unauthorized",
            "code": 401
        }
        response.status(401).send(data)
    }
})


