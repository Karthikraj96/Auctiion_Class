const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/add', function (req, response) {
    let token = req;
    let { vaccine_name, status, vaccine_description, dose1_product_id, dose2_product_id } = req.body
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
                            let stmt = 'insert into vaccine (vaccine_name, status, vaccine_description, dose1_product_id, dose2_product_id) values (?,?,?,?,?)'
                            let values = [vaccine_name, status, vaccine_description, dose1_product_id, dose2_product_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
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
                                    let data = {
                                        "msg": "success",
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
                            "msg": "Unauthorized",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                })
            }
            else {
                let data = {
                    "msg": "Not an admin user",
                    "code": 401
                }
                response.status(401).send(data)
            }
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
module.exports = router.post('/update', function (req, response) {
    let token = req;
    let { vaccine_name, status, vaccine_description, dose1_product_id, dose2_product_id, vaccine_id } = req.body
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
                            let stmt = ' update vaccine set vaccine_name=?, status=?, vaccine_description=?, dose1_product_id=?, dose2_product_id=? where vaccine_id=?'
                            let values = [vaccine_name, status, vaccine_description, dose1_product_id, dose2_product_id, vaccine_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
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
                                    let data = {
                                        "msg": "success",
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
                            "msg": "Unauthorized",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                })
            }
            else {
                let data = {
                    "msg": "Not an admin user",
                    "code": 401
                }
                response.status(401).send(data)
            }
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
module.exports = router.post('/delete', function (req, response) {
    let token = req;
    let { vaccine_id } = req.body
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
                            let stmt = ' delete from vaccine where vaccine_id=?'
                            let values = [vaccine_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
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
                                    let data = {
                                        "msg": "success",
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
                            "msg": "Unauthorized",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                })
            }
            else {
                let data = {
                    "msg": "Not an admin user",
                    "code": 401
                }
                response.status(401).send(data)
            }
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
                            let stmt = 'select * from vaccine'
                            connection.query(stmt, function (err, rows, fields) {
                                if (err) {
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
                                "msg": "Logged Out",
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
            }
            else {
                let data = {
                    "msg": "Not an admin user",
                    "code": 401
                }
                response.status(401).send(data)
            }
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