const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/get', function (req, response) {
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

                        let stmt = 'select reports.test_id ,user_info.first_name,user_info.last_name,products.test_type,hospitals.hospital_name,reports.test_datetime,reports.test_status from reports inner join user_info on reports.user_id= user_info.user_id inner join hospitals on reports.hospital_id = hospitals.hospital_id inner join products on reports.product_id = products.product_id WHERE user_info.user_id = ?'
                        connection.query(stmt, user_id, function (err, rows, fields) {
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
module.exports = router.post('/get1', function (req, response) {
    let {test_id } = req.body
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

                        let stmt = 'select reports.test_id ,user_info.first_name,user_info.last_name,products.test_type,hospitals.hospital_name,hospitals.city,hospitals.state,reports.test_datetime,reports.test_status from reports inner join user_info on reports.user_id= user_info.user_id inner join hospitals on reports.hospital_id = hospitals.hospital_id inner join products on reports.product_id = products.product_id WHERE reports.test_id = ?'
                        connection.query(stmt, test_id, function (err, rows, fields) {
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
module.exports = router.post('/comment', function (req, response) {
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

                        let stmt = ' select cmt_title,cmt_description,cmt_datetime from reports where user_id= ?'
                        connection.query(stmt, user_id, function (err, rows, fields) {
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