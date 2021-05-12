const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/', function (req, response) {
    let token = req;
    if (token) {
        decode(token).then(res => {
            let { email_id, user_id } = res
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
                        let stmt = 'select bills.bill_id,bill_items.amount,bills.payment_status,bills.payment_date from bills inner join bill_items on bills.bill_id=bill_items.bill_id where bills.user_id =?'
                        connection.query(stmt, user_id, function (err, rows, fields) {
                            if (err) {
                                console.log("error", err)
                                let data = {
                                    "msg": "Unauthorized ",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.affectedRows === 0) {
                                let data = {
                                    "msg": "Unauthorized ",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else {
                                let data = {
                                    "msg": "success",
                                    "data": rows,
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
                "msg": "Invalid Token",
                "code": 401
            }
            response.status(401).send(data)
        })
    }
    else {
        let data = {
            "msg": "Unauthorized ",
            "code": 401
        }
        response.status(401).send(data)
    }
})
