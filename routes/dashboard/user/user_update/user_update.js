const tokengenerate = require('../../../../token').tokengenerate
const router = require('express').Router()
const connection = require('../../../../db')
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = router.post('/', function (req, response) {
  let token = req;
  let { firstname, lastname, phone, country, city, state, address1, address2, pincode, oldpassword, confirmpassword } = req.body
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

            values = [firstname, lastname, phone, address1, address2, city, state, country, pincode, user_id]
            stmt = 'update user_info set first_name = ?,last_name =? ,phone_no =?,address_line1 =?,address_line2 =? ,district =?,state =?,country =?,pincode =? where user_id = ?'
            connection.query(stmt, values, function (err, rows, fields) {
              if (err) {
                console.log(err)
                let data = {
                  "msg": "Invalid User",
                  "code": 400
                }
                response.status(401).send(data)
              }
              else {
                if (confirmpassword && oldpassword) {
                  connection.query('select password from users where email_id = ?', email_id, function (err, rows, fields) {
                    if (err) {
                      console.log(err)
                      let data = {
                        "msg": "Invalid User",
                        "code": 400
                      }
                      response.status(401).send(data)
                    }
                    else if (rows.length <= 0) {
                      let data = {
                        "msg": "Invalid User",
                        "code": 400
                      }
                      response.status(401).send(data)
                    }
                    else {
                      hash = rows[0].password
                      bcrypt.compare(oldpassword, hash, function (err, res) {
                        if (err) {
                          console.log(err)
                        }
                        else if (res) {
                          let value = req.body
                          tokengenerate(value).then(res => {
                            token = res
                            if (token) {
                              let values = [token, email_id]
                              stmt = 'update session_mgmt set session_id =? where email_id = ?'
                              connection.query(stmt, values, function (err, rows, fields) {
                                if (err) {
                                  console.log(err)
                                }
                                else {
                                  bcrypt.hash(confirmpassword, saltRounds, (err, hash) => {
                                    if (err) {
                                      let data = { "msg": "Hash Error", "code": 401 }
                                      response.status(401).send(data)
                                    }
                                    else {
                                      stmt = 'update users set password = ? where email_id'
                                      value = [hash, email_id]
                                      connection.query(stmt, value, function (err, rows, fields) {
                                        if (err) {
                                          let data = { "msg": "Invalid Token", "code": 401 }
                                          response.status(401).send(data)
                                        } else {
                                          let data = { "msg": "profile updated", "token": token, "code ": 200 }
                                          response.send(data)

                                        }
                                      })
                                    }
                                  })
                                }
                              })
                            }
                            else {
                              let data = { "msg": "Invalid Token", "code": 401 }
                              response.status(401).send(data)
                            }
                          })
                        }
                        else {
                          let data = { "msg": "Invalid Token", "code": 401 }
                          response.status(401).send(data)
                        }
                      })
                    }
                  })
                }
                else {
                  let data = { "msg": "profile updated", "token": token, "code ": 200 }
                  response.send(data)
                }
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
  } else {
    let data = { "msg": "Invalid Token", "code": 401 }
    response.status(401).send(data)
  }
})