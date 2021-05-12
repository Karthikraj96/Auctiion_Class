const login = require('../../verifyotp').login
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = require('express').Router()
const connection = require('../../db')

module.exports = router.post('/', function (req, response) {
    let { email_id, password } = req.body
    req.body.password = undefined
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            let data = {
                "msg": "Hash Error",
                "code": 401
            }
            response.status(401).send(data)
        }
        else {
            connection.query('select email_verify_status from users where email_id = ?', email_id, function (err, rows, fields) {
                if (err) {
                    let data = {
                        "msg": "Database Error",
                        "code": 401
                    }
                    response.status(401).send(data)
                }
                else if (rows.length > 0) {
                    let verify = rows[0].email_verify_status
                    if (verify) {
                        let data = {
                            "msg": "Already Registerd",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                }
                else {
                    let password2 = hash
                    login(email_id).then((res) => {
                        if(res === undefined){
                            let data = {
                                "msg": "Unable to verify Email",
                                "code": 400
                            }
                            response.status.send(data)
                        }
                        else if (res != "rand") {
                            let verification_code = res
                            let values = [email_id, hash, verification_code]
                            let stmt = 'insert into users (email_id,password,verification_code) values (?,?,?)'
                            connection.query(stmt, values, (err, rows, fields) => {
                                if (err) {
                                    if (err.errno === 1062) {
                                        values = [password2, verification_code, email_id, email_id]
                                        stmt = 'update users set password =?,verification_code = ? , modified_by = ? where email_id = ?'
                                        connection.query(stmt, values, function (err, rows, fields) {
                                            if (err) {
                                                console.log(err)
                                                let data = {
                                                    "msg": "Invalid Email Address ",
                                                    "code": 401
                                                }
                                                response.status(401).send(data)
                                            }
                                            else {
                                                let data = {
                                                    "msg": "Success",
                                                    "code": 200
                                                }
                                                response.send(data)
                                            }
                                        })
                                    }
                                }
                                else {
                                    let data = {
                                        "msg": "Success",
                                        "code": 200
                                    }
                                    response.send(data)
                                }
                            })
                        }
                        else if (res === "rand") {
                            let data = {
                                "msg": "Unable to verify Email",
                                "code": 400
                            }
                            response.status.send(data)
                        }
                        else {
                            let data = {
                                "msg": "Unable to Verify Email Address",
                                "code": 401
                            }
                            response.status(401).send(data)
                        }
                    }).catch((err) => {
                        if (err) {

                            let data = {
                                "msg": "Unable to Verify Email Address",
                                "code": 401
                            }
                            response.status(401).send(data)
                        }
                    })

                }
            })

        }
    })
})
module.exports = router.post('/otp', (req, response) => {
    let { email_id, otp } = req.body
    if (email_id && otp) {
        let stmt = 'select verification_code from users where email_id = ?'
        let value = [email_id]
        connection.query(stmt, value, (err, rows, fields) => {
            if (err) {
                let data = {
                    "msg": "Invalid Email Address",
                    "code": 401
                }
                response.status(401).send(data)
            }
            if (rows.length > 0) {
                let otp2 = rows[0].verification_code
                if (otp == otp2) {
                    let values = [email_id, email_id]
                    stmt = 'update users set  email_verify_status = 1 , modified_by = ? where email_id = ?'
                    connection.query(stmt, values, function (err, rows, fields) {
                        if (err) {
                            console.log(err)
                        }
                        let data = {
                            "msg": "Success",
                            "code": 200
                        }
                        response.send(data)
                    })
                }
                else {
                    let data = {
                        "msg": "Invalid Otp",
                        "code": 401
                    }
                    response.status(401).send(data)
                }
            }
            else {
                let data = {
                    "msg": "Invalid User",
                    "code": 401
                }
                response.status(401).send(data)
            }

        })
    }
    else if (otp) {
        let data = {
            "msg": "Invalid Email",
            "code": 401
        }
        response.status(401).send(data)

    }
    else {
        let data = {
            "msg": "Invalid Otp",
            "code": 401
        }
        response.status(401).send(data)
    }

});

module.exports = router.post('/complete', function (req, response) {
    let { email_id, firstname, lastname, phone, country, state, city, address1, address2, pincode } = req.body
    let user_id, verify
    connection.query('select user_id,email_verify_status from users where email_id = ?', email_id, function (err, rows, fields) {
        if (err) {
            let data = {
                "msg": "Database Error",
                "code": 401
            }
            response.status(401).send(data)
        }
        else if (rows.length > 0) {
            user_id = rows[0].user_id
            verify = rows[0].email_verify_status
            if (verify) {
                let stmt = 'insert into user_info (user_id,first_name,last_name,phone_no,address_line1,address_line2,district,state,country,pincode) values (?,?,?,?,?,?,?,?,?,?)'
                let values = [user_id, firstname, lastname, phone, address1, address2, city, state, country, pincode]
                connection.query(stmt, values, function (err, rows, fields) {
                    if (err) {
                        if (err.errno === 1062) {
                            values = [firstname, lastname, phone, address1, address2, city, state, country, pincode, user_id]
                            stmt = 'update user_info set first_name = ?,last_name =? ,phone_no =?,address_line1 =?,address_line2 =? ,district =?,state =?,country =?,pincode =? where user_id = ?'
                            connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                    let data = {
                                        "msg": "Database Error",
                                        "code": 401
                                    }
                                    response.status(401).send(data)
                                }
                                else if (rows.affectedRows > 0) {
                                    let active = "active"
                                    let values = [active, email_id, email_id]
                                    stmt = 'update users set user_status =1,user_mode=?, modified_by = ? where email_id = ?'
                                    connection.query(stmt, values, function (err, rows, fields) {
                                        if (err) {
                                            let data = {
                                                "msg": "Database Error",
                                                "code": 401
                                            }
                                            response.status(401).send(data)
                                        }
                                        else if (rows.affectedRows > 0) {
                                            let data = {
                                                "msg": "Success",
                                                "code": 200
                                            }
                                            response.send(data)
                                        } else {
                                            let data = {
                                                "msg": "Invalid Email",
                                                "code": 401
                                            }
                                            response.status(401).send(data)
                                        }
                                    })
                                }
                                else {
                                    let data = {
                                        "msg": "Invalid Email",
                                        "code": 401
                                    }
                                    response.status(401).send(data)
                                }
                            })
                        }
                        else {
                            console.log("err", err)
                            let data = {
                                "msg": "Invalid Email",
                                "code": 401
                            }
                            response.status(401).send(data)
                        }
                    }
                    else if (rows.affectedRows > 0) {
                        let active = "active"
                        let values = [active, email_id, email_id]
                        stmt = 'update users set user_status =1,user_mode=?, modified_by = ? where email_id = ?'
                        connection.query(stmt, values, function (err, rows, fields) {
                            if (err) {
                                let data = {
                                    "msg": "Database Error",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.affectedRows > 0) {
                                let data = {
                                    "msg": "Success",
                                    "code": 200
                                }
                                response.send(data)
                            } else {
                                let data = {
                                    "msg": "Invalid Email",
                                    "code": 401
                                }
                                response.status(401).send(data)
                            }
                        })
                    }
                    else {
                        console.log("err", err)
                        let data = {
                            "msg": "Invalid Email",
                            "code": 401
                        }
                        response.status(401).send(data)
                    }
                })
            }
            else {
                let data = {
                    "msg": "Please Verify The Email Address To Continue",
                    "code": 401
                }
                response.status(401).send(data)
            }
        }
        else {
            let data = {
                "msg": "Invalid Email 4",
                "code": 401
            }
            response.status(401).send(data)
        }
    })
})

module.exports = router.post('/back', function (req, response) {
    let { email_id } = req.body
    if (email_id) {
        let values = [email_id]
        stmt = 'delete from users where email_id = ?'
        connection.query(stmt, values, function (err, rows, fields) {
            if (err) {
                let data = {
                    "msg": "Database Error",
                    "code": 401
                }
                response.status(401).send(data)
            }
            else if (rows.affectedRows > 0) {
                let data = {
                    "msg": "User Removed",
                    "code": 200
                }
                response.send(data)
            } else {
                console.log(rows)
                let data = {
                    "msg": "No Data Found",
                    "code": 200
                }
                response.send(data)
            }
        })
    }
    else {
        let data = {
            "msg": "Please Enter Email Address",
            "code": 401
        }
        response.status(401).send(data)
    }
})