const router = require('express').Router()
const connection = require('../../db')
const decode = require('../../token').tokendecode
module.exports = router.post('/', (req, response) => {
    let token = req;
    if (token) {
        decode(token).then(res => {
            let stmt = 'delete from session_mgmt where email_id = ?;'
        connection.query(stmt, res.email_id, (err, rows, fields) => {
            if (err) {
                let data = { "msg": "Token is Not Valid", "code": 401 }
                response.status(401).send(data)
            }
            else if (rows.affectedRows === 0) {
                let data = { "msg": "Token is Not Valid", "code": 401 }
                response.status(401).send(data)
            }
            else {
                let data = { "msg": "Logout Success", "code": 200 }
                response.send(data)

            }
        })
        }).catch(err => {
            let data = { "msg": "Token is Not Valid", "code": 401 }
            response.status(401).send(data)
        })
    }
    else {
        let data = { "msg": "Token is Missing", "code": 401 }
        response.status(401).send(data)
    }
})