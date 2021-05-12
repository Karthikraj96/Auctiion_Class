const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/add', function (req, response) {
    let token = req;
    let { hospital_name, state, city, status, product_id, vaccine_id } = req.body
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
                            let stmt = 'insert into hospitals (hospital_name, state, city, status, product_id,vaccine_id) values (?,?,?,?,?,?)'
                            let values = [hospital_name, state, city, status, product_id, vaccine_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows === 0) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else {
                                    let data = { "msg": "Hospital added", "code": 200 }
                                    response.send(data)

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
            }
        }).catch(err => {
            console.log(err)
            let data = { "msg": "Token is Not Valid", "code": 401 }
            response.status(401).send(data)
        })

    }
    else {
        let data = { "msg": "Token is Not Valid", "code": 401 }
        response.status(401).send(data)
    }
})
module.exports = router.post('/update', function (req, response) {
    let { hospital_name, state, city, status, product_id, hospital_id, vaccine_id } = req.body
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
                            let stmt = ' update hospitals set hospital_name=?, state=?, city=?, status=?, vaccine_id = ?,product_id=? where hospital_id=?'
                            let values = [hospital_name, state, city, status, vaccine_id, product_id, hospital_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows === 0) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else {
                                    let data = { "msg": "Hospital Updated", "code": 200 }
                                    response.send(data)
                                }
                            })
                        }
                        else {
                            let data = { "msg": "Logged out", "code": 401 }
                            response.status(401).send(data)
                        }
                    }
                    else {
                        let data = { "msg": "Logged out", "code": 401 }
                        response.status(401).send(data)
                    }
                })
            }
        }).catch(err => {
            console.log(err)
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
    let { hospital_id } = req.body
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
                            let stmt = ' delete from hospitals where hospital_id=?'
                            let values = [hospital_id]
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows === 0) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else {
                                    let data = { "msg": "Hospital Deleted", "code": 200 }
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
            }
        }).catch(err => {
            console.log(err)
            let data = { "msg": "Token is Not Valid", "code": 401 }
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
                            let stmt = 'select * from hospitals'
                            connection.query(stmt, function (err, rows, fields) {
                                if (err) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows === 0) {
                                    let data = { "msg": "Token is Not Valid", "code": 401 }
                                    response.status(401).send(data)
                                }
                                else {
                                    let data = { "msg": "Hospital is displayed", "code": 200, "data": rows }
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
            }
        }).catch(err => {
            console.log(err)
            let data = { "msg": "Token is Not Valid", "code": 401 }
            response.status(401).send(data)
        })

    }
    else {
        let data = { "msg": "Token is Not Valid", "code": 401 }
        response.status(401).send(data)
    }
})
