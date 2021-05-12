const router = require('express').Router()
const connection = require('../../../../db')
const multer = require('multer')
const fs = require("fs")
const decode = require('../../../../token').tokendecode
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/public/imageuploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `passport2immunity-user_image-${file.originalname}`);
    },
});
let image_upload = multer({ storage: storage })

module.exports = router.post('/image_load', (req, response) => {
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
                        connection.query('select path from user_image_src where user_id = ?', user_id, function (err, rows, fields) {
                            if (err) {
                                let data = { "msg": "no image found", "code ": 400 }
                                response.status(401).send(data)
                            }
                            else if (rows) {
                                let path = rows[0].path
                                let data = { "msg": "image found", "code ": 200, "path": path }
                                response.status(401).send(data)
                            }
                            else {
                                let data = { "msg": "no image found", "code ": 400 }
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
        let data = { "msg": "Invalid Token", "code ": 400 }
        response.status(401).send(data)
    }
})
module.exports = router.post('/image_upload', image_upload.single("user_image"), function (req, response) {
    let token = req;
    let path = req.file.path
    if (token) {
        decode(token).then(res => {
            let { email_id,user_id } = res
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
                        let stmt = 'insert into user_image_src (user_id,path) values (?,?)'
                        let values = [user_id, path]
                        connection.query(stmt, values, function (err, rows, fields) {
                            if (err) {
                                if (err.errno === 1062) {
                                    values = [path, user_id, user_id]
                                    stmt = 'update user_image_src set path = ?, modified_by = ? where user_id = ?'
                                    connection.query(stmt, values, function (err, rows, fields) {
                                        if (err) {
                                            let data = { "msg": "Invalid Token", "code ": 400 }
                                            response.status(401).send(data)
                                        }
                                        else {
                                            let data = { "msg": "image found", "code ": 200, "path": path }
                                            response.status(401).send(data)
                                        }
                                    })
                                }
                                else {
                                    let data = { "msg": "Invalid Token", "code ": 400 }
                                    response.status(401).send(data)
                                }
                            }
                            else {
                                let data = { "msg": "image found", "code ": 200, "path": path }
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
        let data = { "msg": "Invalid Token", "code ": 400 }
        response.status(401).send(data)
    }
})
module.exports = router.post('/dashboard/user/image_delete', (req, response) => {
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
                        connection.query('select path from user_image_src where user_id =?', user_id, function (err, rows, fields) {
                            if (err) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 400
                                }
                                response.status(401).send(data)
                            }
                            else if (rows.affectedRows < 0) {
                                let data = {
                                    "msg": "Unauthorized",
                                    "code": 400
                                }
                                response.status(401).send(data)
                            }
                            else {
                                let pathToFile = rows[0].path
                                connection.query('delete from user_image_src where user_id = ?', user_id, function (err, rows, fields) {
                                    if (err) {
                                        let data = {
                                            "msg": "Unauthorized",
                                            "code": 400
                                        }
                                        response.status(401).send(data)
                                    }
                                    else if (rows.affectedRows < 0) {
                                        let data = {
                                            "msg": "Unauthorized",
                                            "code": 400
                                        }
                                        response.status(401).send(data)
                                    }
                                    else {
                                        fs.unlink(pathToFile, function (err) {
                                            if (err) {
                                                throw err
                                            } else {
                                                let data = {
                                                    "msg": "Successfully deleted the file",
                                                    "code": 200
                                                }
                                                response.send(data)
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
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
            "code": 400
        }
        response.status(401).send(data)
    }
})
