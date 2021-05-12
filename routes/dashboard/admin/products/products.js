const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/add', function (req, response) {
    let { product_id, test_name, status, test_description, actual_price, offer_price, test_type, offer_text } = req.body
    let token = req;
    if (token) {
        decode(token).then(res => {
            email_id = res.email_id
            admin_user = res.admin_user
            if (admin_user) {
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
                            let stmt = 'insert into products (product_id,test_name,test_description,actual_price,offer_price,status,test_type,offer_text) values (?,?,?,?,?,?,?,?)'
                            let values = [product_id, test_name, test_description, actual_price, offer_price, status, test_type, offer_text]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                    if (err.errno === 1062) {
                                        let data = { "msg": "Products is Already there try to change the product code", "code": 401 }
                                        response.status(401).send(data)
                                    } else {
                                        let data = { "msg": "Token is Not Valid", "code": 401 }
                                        response.status(401).send(data)
                                    }
                                }
                                else {
                                    let data = { "msg": "products added", "code": 200 }
                                    response.send(data)
                                }
                            })
                        }
                        else {
                            let data = { "msg": "Token is Not Valid", "code": 401 }
                            response.status(401).send(data)
                        }
                    }
                    else {
                        let data = { "msg": "Logged Out", "code": 401 }
                        response.status(401).send(data)
                    }
                }).catch(err => {
                    let data = { "msg": "Token is Not Valid", "code": 401 }
                    response.status(401).send(data)
                })
            }
            else {
                let data = { "msg": "Token is Not Valid", "code": 401 }
                response.status(401).send(data)
            }
        })
    }
    else {
        let data = { "msg": "Token is Not Valid", "code": 401 }
        response.status(401).send(data)
    }
})
module.exports = router.post('/update', function (req, response) {
    let { product_id, test_name, status, test_description, actual_price, offer_price, test_type, offer_text } = req.body
    let token = req;
    if (token) {
        decode(token).then(res => {
            email_id = res.email_id
            admin_user = res.admin_user
            if (admin_user) {
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
                            let stmt = 'update products set test_name=?,test_description=?,actual_price=?,offer_price=?,status=?,test_type=?,offer_text=? where product_id =?'
                            let values = [test_name, test_description, actual_price, offer_price, status, test_type, offer_text, product_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows > 0) {
                                    let data = { "msg": "products added", "code": 200 }
                                    response.send(data)
                                }
                                else {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                            })
                        }
                        else {
                            let data = { "msg": "Logged Out", "code": 401 }
                            response.status(401).send(data)
                        }
                    } else {
                        let data = { "msg": "Token is Not Valid", "code": 401 }
                        response.status(401).send(data)
                    }
                })

            } else {
                let data = { "msg": "Not An Admin User", "code": 401 }
                response.status(401).send(data)
            }
        }).catch(err => {
            let data = { "msg": "Token is Not Valid", "code": 401 }
            response.status(401).send(data)
        })
    }
    else {
        let data = { "msg": "Token is Not Valid", "code": 401 }
        response.status(401).send(data)
    }
})
module.exports = router.post('/delete', function (req, response) {
    let { product_id } = req.body
    let token = req;
    if (token) {
        decode(token).then(res => {
            email_id = res.email_id
            admin_user = res.admin_user
            if (admin_user) {
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
                            connection.query('DELETE FROM `products` WHERE `products`.`product_id` = ?', product_id, function (err, rows, fields) {
                                if (err) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows === 0) {
                                    response.status(404).send("Deleted No Records found")
                                }
                                else {
                                    let data = { "msg": "Products Deleted", "code": 200 }
                                    response.send(data)
                                }
                            })
                        }
                        else {
                            let data = { "msg": "Logged Out", "code": 401 }
                            response.status(401).send(data)
                        }
                    }
                    else {
                        let data = { "msg": "Token is Not Valid", "code": 401 }
                        response.status(401).send(data)
                    }
                })
            } else {
                let data = { "msg": "not an admin user", "code": 401 }
                response.status(401).send(data)
            }
        }).catch(err => {
            let data = { "msg": "Invalid Token", "code": 401 }
            response.status(401).send(data)
        })
    }
    else {
        let data = { "msg": "Token is Not Valid", "code": 401 }
        response.status(401).send(data)
    }

})
module.exports = router.post('/get', function (req, response) {
    let token = req;
    if (token) {
        decode(token).then(res => {
            email_id = res.email_id
            admin_user = res.admin_user
            if (admin_user) {
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
                                "msg": "Logged Out",
                                "code": 401
                            }
                            response.status(401).send(data)
                        }
                    }
                    else {
                        let data = {
                            "msg": "Logged Out",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                })
            }
            else {
                let data = {
                    "msg": "Not An Admin user",
                    "code": 401
                }
                response.status(401).send(data)
            }

        }).catch(err => {
            let data = {
                "msg": "Token is Not Valid",
                "code": 401
            }
            response.status(401).send(data)
        })
    }
    else {
        let data = {
            "msg": "Token is Missing",
            "code": 401
        }
        response.status(401).send(data)
    }
})