const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/no_test', function (req, response) {
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
                        let stmt = 'SELECT COUNT(test_id) AS NoOfCovidTest FROM reports where user_id =? '
                        connection.query(stmt, user_id, function (err, rows, fields) {
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
                                let no_test = rows[0].NoOfCovidTest;
                                let stmt = 'SELECT COUNT(test_id) AS NoOfPositive FROM reports where user_id =? and covid_status = 1 '
                                connection.query(stmt, user_id, function (err, rows, fields) {
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
                                        let positive = rows[0].NoOfPositive
                                        let stmt = 'SELECT COUNT(test_id) AS NoOfNegative FROM reports where user_id =? and covid_status = 0 '
                                        connection.query(stmt, user_id, function (err, rows, fields) {
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
                                                let negative = rows[0].NoOfNegative
                                                let status = 'InProgress'
                                                let values = [status, user_id]
                                                let stmt = 'SELECT COUNT(test_id) AS InProgress FROM reports where test_status = ?AND user_id = ? '
                                                connection.query(stmt, values, function (err, rows, fields) {
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
                                                        let data = {
                                                            "No Of Negative": negative,
                                                            "No Of Positive": positive,
                                                            "No Of CovidTest": no_test,
                                                            "In Progress": rows[0].InProgress
                                                        }
                                                        let data2 = {
                                                            "msg": "success",
                                                            "data": data,
                                                            "code": 200
                                                        }
                                                        response.send(data2)
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
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
module.exports = router.post('/updates', function (req, response) {
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
                        let stmt = 'SELECT reports.created_date,user_info.first_name,user_info.last_name,reports.product_id,reports.test_status FROM reports inner join user_info on reports.user_id=user_info.user_id where reports.user_id = ? order by reports.created_date desc '
                        connection.query(stmt, user_id, function (err, rows, fields) {
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
module.exports = router.post('/vaccine_add', function (req, response) {
    let token = req;
    let { onbehalf, vaccine_name, first_name, last_name, aadhar_no, passport_no, dose_date } = req.body
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
                        let values = [user_id, onbehalf, vaccine_name, first_name, last_name, aadhar_no, passport_no, dose_date]
                        let stmt = 'INSERT INTO `vaccine_info`(user_id,onbehalf,vaccine_name,first_name,last_name,aadhar_no,passport_no,dose_date) VALUES (?,?,?,?,?,?,?,?) '
                        connection.query(stmt, values, function (err, rows, fields) {
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
module.exports = router.post('/vaccine_get', function (req, response) {
    let token = req;
    if (token) {
        decode(token).then(res => {
            let { email_id} = res
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
                        connection.query('select vaccine_name,vaccine_description from vaccine', function (err, rows, fields) {
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
