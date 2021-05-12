const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/selected', function (req, response) {
    let token = req;
    let { quantity, test_type, amount } = req.body
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

                        let stmt = 'insert into bill_items (quantity,item_name,amount,user_id) values (?,?,?,?)'
                        let values = [quantity, test_type, amount, user_id]
                        connection.query(stmt, values, (err, rows, fields) => {
                            if (err) {
                                response.status(401).send("Unauthorized ")
                            }
                            else if (rows.affectedRows > 0) {
                                response.send("billing values inserted")
                            }
                            else {
                                response.status(401).send("Unauthorized ")
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
        response.status(401).send("Unauthorized ")
    }
})
module.exports = router.post('/get', function (req, response) {
    let token = req;
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
                        connection.query('select * from products', function (err, rows, fields) {
                            if (err) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.length > 0) {
                                let data = {
                                    "msg": "success",
                                    "data": rows,
                                    "code": 200
                                }
                                response.send(data)
                            }
                            else {
                                let data = {
                                    "msg": "No Products",
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
            "msg": "Unauthorized",
            "code": 401
        }
        response.status(401).send(data)
    }
})
module.exports = router.post('/state', function (req, response) {
    let token = req;
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
                        connection.query('select state from hospitals', function (err, rows, fields) {
                            if (err) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.length > 0) {
                                let data = {
                                    "msg": "success",
                                    "data": rows,
                                    "code": 200
                                }
                                response.send(data)
                            }
                            else {
                                let data = {
                                    "msg": "No Products",
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
            "msg": "Unauthorized",
            "code": 401
        }
        response.status(401).send(data)
    }
})
module.exports = router.post('/city', function (req, response) {
    let token = req;
    let { state } = req.body
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
                        connection.query('select city from hospitals where state =?', state, function (err, rows, fields) {
                            if (err) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.length > 0) {
                                let data = {
                                    "msg": "success",
                                    "data": rows,
                                    "code": 200
                                }
                                response.send(data)
                            }
                            else {
                                let data = {
                                    "msg": "No Products",
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
            "msg": "Unauthorized",
            "code": 401
        }
        response.status(401).send(data)
    }

})
module.exports = router.post('/hospital', function (req, response) {
    let token = req;
    let { city, state } = req.body
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
                        let values = [state, city]
                        connection.query('select hospital_name,hospital_id from hospitals where state =? AND city = ?', values, function (err, rows, fields) {
                            if (err) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.length > 0) {
                                let data = {
                                    "msg": "success",
                                    "data": rows,
                                    "code": 200
                                }
                                response.send(data)
                            }
                            else {
                                let data = {
                                    "msg": "No Hospitals",
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
            "msg": "Unauthorized",
            "code": 401
        }
        response.status(401).send(data)
    }

})
module.exports = router.post('/get_by_hospital', function (req, response) {
    let token = req;
    let { hospital_id } = req.body
    if (token) {
        if (hospital_id) {
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

                            connection.query('select product_id from hospitals where hospital_id = ?', hospital_id, function (err, rows, fields) {
                                if (err) {
                                    console.log(err)
                                    let data = {
                                        "msg": "Unauthorized",
                                        "code": 401
                                    }
                                    response.status(401).send(data)
                                }
                                else if (rows.length > 0) {
                                    let value = rows[0].product_id.split(',')
                                    let product = value.map(item => {
                                        return parseInt(item)
                                    })
                                    console.log(product)
                                    connection.query('select * from products where product_id in (' + [product] + ')', function (err, rows, fields) {
                                        if (err) {
                                            console.log(err)
                                            let data = {
                                                "msg": "Unauthorized",
                                                "code": 401
                                            }
                                            response.status(401).send(data)
                                        }
                                        else if (rows.length > 0) {
                                            let data = {
                                                "msg": "success",
                                                "data": rows,
                                                "code": 200
                                            }
                                            response.send(data)
                                        } else {
                                            let data = {
                                                "msg": "No Products Found",
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
                })

            }).catch(err => {
                let data = {
                    "msg": "Invalid Token",
                    "code": 401
                }
                response.status(401).send(data)
            })
        } else {
            let data = {
                "msg": "NO Hospital Id",
                "code": 401
            }
            response.status(401).send(data)
        }
    }
    else {
        let data = {
            "msg": "Token is missing ",
            "code": 401
        }
        response.status(401).send(data)
    }

})