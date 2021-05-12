const tokengenerate = require('../../token').tokengenerate
const tokendecode = require('../../token').tokendecode
const bcrypt = require('bcrypt');
const router = require('express').Router()
const connection = require('../../db')
module.exports = router.post('/', (req, response) => {
    let { email_id, password } = req.body
    req.body.password = undefined
    let token_value
    let hash
    if (email_id) {
        if (password) {
            connection.query('select password,email_verify_status from users where email_id = ?', email_id, function (err, rows, fields) {
                if (err) {
                    let data = { "msg": "Invalid email address", "code": 401 }
                    response.status(401).send(data)
                }
                else if (rows.length <= 0) {
                    let data = { "msg": "Invalid email address", "code": 401 }
                    response.status(401).send(data)
                }
                else if (rows.length > 0) {
                    let verify = rows[0].email_verify_status
                    if (verify) {
                        hash = rows[0].password
                        bcrypt.compare(password, hash, function (err, res) {
                            if (err) {
                                let data = { "msg": "Hash Error", "code": 401 }
                                response.status(401).send(data)
                            }
                            else if (res) {
                                connection.query('select users.admin_user,user_info.first_name,user_info.last_name,users.user_id from users inner join user_info on users.user_id = user_info.user_id  where users.email_id = ?', email_id, function (err, rows, fields) {

                                    if (err) {
                                        let data = { "msg": "Wrong Password", "code": 401 }
                                        response.status(401).send(data)
                                    }
                                    else if (rows.length >= 0) {
                                        let name = rows[0].first_name + ' ' + rows[0].last_name
                                        let admin_user = rows[0].admin_user
                                        let user_id = rows[0].user_id
                                        let session = ['loggedin', email_id]
                                        token_value = { "admin_user": admin_user, "user_id": user_id, "email_id": email_id,"name":name }
                                        connection.query('insert into session_mgmt values(?,?)', session, function (err, rows,) {
                                            if (err) {
                                                if (err.no = 1062) {
                                                    tokengenerate(token_value).then(res => {
                                                        let token = res;
                                                        if (admin_user) {

                                                            let data = { "user": 1, "username": name, "token": token }
                                                            response.send(data)
                                                        }
                                                        else {
                                                            let data = { "user": 0, "username": name, "token": token }
                                                            response.send(data)
                                                        }

                                                    }).catch(err => {
                                                        console.log(err)
                                                        let data = { "msg": "Token Error", "code": 401 }
                                                        response.status(401).send(data)
                                                    })
                                                }
                                                else {
                                                    console.log(err)
                                                    let data = { "msg": "Token Error", "code": 401 }
                                                    response.status(401).send(data)
                                                }
                                            }
                                            else {
                                                tokengenerate(token_value).then(res => {
                                                    let token = res;
                                                    if (admin_user) {

                                                        let data = { "user": 1, "username": name, "token": token }
                                                        response.send(data)
                                                    }
                                                    else {
                                                        let data = { "user": 0, "username": name, "token": token }
                                                        response.send(data)
                                                    }

                                                }).catch(err => {
                                                    console.log(err)
                                                    let data = { "msg": "Token Error", "code": 401 }
                                                    response.status(401).send(data)
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                            else {
                                let data = { "msg": "Wrong Password", "code": 401 }
                                response.status(401).send(data)
                            }
                        })
                    }
                    else {
                        let data = { "msg": "First Finish The Signup Process", "code": 401 }
                        response.status(401).send(data)
                    }
                }
            })
        }
        else {
            let data = {
                "msg": "password is missing",
                "code": 401
            }
            response.status(400).send(data)
        }
    }
    else {
        let data = {
            "msg": "email is missing",
            "code": 401
        }
        response.status(400).send(data)
    }
})


module.exports = router.post('/decode', (req, response) => {
    let token = req
    if (token) {
        tokendecode(token).then(decoded => {
            response.send(decoded)
        }).catch(err => {
            console.log(err)
        })

    }
    else {
        response.send("failed")
    }
})