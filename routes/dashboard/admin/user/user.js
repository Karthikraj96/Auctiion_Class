const router = require('express').Router()
const decode = require('../../../../token').tokendecode
const connection = require('../../../../db')
module.exports = router.post('/get1', function (req, response) {
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
              let stmt = 'SELECT user_info.first_name,user_info.last_name, users.email_id,users.user_status FROM user_info INNER JOIN users ON user_info.user_id = users.user_id'
              connection.query(stmt, function (err, rows, fields) {
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
                    "msg": "No User Found",
                    "code": 200
                  }
                  response.send(data)
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
      }
      else {
        let data = {
          "msg": "Not An Admin",
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
              let stmt = 'SELECT users.email_id, user_info.first_name, user_info.last_name, user_info.phone_no, user_info.address_line1, user_info.address_line2, user_info.district, user_info.state, user_info.country, user_info.pincode  FROM user_info INNER JOIN users ON user_info.user_id = users.user_id'
              connection.query(stmt, function (err, rows, fields) {
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
      }
      else {
        let data = {
          "msg": "Not An Admin",
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
module.exports = router.post('/edit', function (req, response) {
  let token = req;
  let { email_id, firstname, lastname, phone, address1, address2, city, state, country, pincode, confirmpassword, status } = req.body
  if (token) {
    decode(token).then(res => {
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
              connection.query('select user_id from users where email_id = ?', email_id, function (err, rows, fields) {
                if (err) {
                  let data = {
                    "msg": "Unauthorized",
                    "code": 401
                  }
                  response.status(401).send(data)
                }
                else if (rows.length >= 0) {
                  let data = {
                    "msg": "Unauthorized",
                    "code": 401
                  }
                  response.status(401).send(data)
                }
                else {
                  let user_id = rows[0].user_id
                  values = [firstname, lastname, phone, address1, address2, city, state, country, pincode, user_id]
                  stmt = 'update user_info set first_name = ?,last_name =? ,phone_no =?,address_line1 =?,address_line2 =? ,district =?,state =?,country =?,pincode =? where user_id = ?'
                  connection.query(stmt, values, function (err, rows, fields) {
                    if (err) {
                      console.log(err)
                      response.status(401).send("Invalid User")
                    }
                    else if (rows.affectedRows > 0) {
                      if (confirmpassword) {
                        bcrypt.hash(confirmpassword, saltRounds, (err, hash) => {
                          if (err) {
                            console.log("hash error", err)
                          }
                          else {
                            stmt = 'update users set password = ? where email_id'
                            value = [hash, email_id]
                            connection.query(stmt, value, function (err, rows, fields) {
                              if (err) {
                                console.log(err)
                                let data = {
                                  "msg": "Unauthorized",
                                  "code": 401
                                }
                                response.status(401).send(data)
                              } else {
                                let data = {
                                  "msg": "success",
                                  "code": 200
                                }
                                response.send(data)
                              }
                            })
                          }
                        })
                      }
                      else {
                        let data = {
                          "msg": "success",
                          "code": 200
                        }
                        response.send(data)
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
              })
            }
            else {
              let data = {
                "msg": "Logged out",
                "code": 401
              }
              response.status(401).send(data)
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
      "msg": "Unauthorized",
      "code": 401
    }
    response.status(401).send(data)
  }
})
module.exports = router.post('/delete', function (req, response) {
  let token = req;
  let { email_id } = req.body
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
              connection.query('select user_id from users where email_id = ?', email_id, function (err, rows, fields) {
                let user_id = rows[0].user_id
                if (err) {
                  let data = {
                    "msg": "Unauthorized",
                    "code": 401
                  }
                  response.status(401).send(data)
                }
                else if (user_id) {
                  connection.query('delete from users where email_id = ?', email_id, function (err, rows, fields) {
                    if (err) {
                      let data = {
                        "msg": "Unauthorized",
                        "code": 401
                      }
                      response.status(401).send(data)
                    }
                    else if (rows.affectedRows > 0) {
                      connection.query('delete from user_info where user_id = ?', user_id, function (err, rows, fields) {
                        if (err) {
                          let data = {
                            "msg": "Unauthorized",
                            "code": 401
                          }
                          response.status(401).send(data)
                        }
                        else if (rows.affectedRows > 0) {
                          connection.query('delete from session_mgmt where email_id = ?', email_id, function (err, rows, fields) {
                            if (err) {
                              let data = {
                                "msg": "Unauthorized",
                                "code": 401
                              }
                              response.status(401).send(data)
                            }
                            else if (rows.affectedRows > 0) {
                              let data = {
                                "msg": "success",
                                "code": 200
                              }
                              response.send(data)
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
                            "msg": "Unauthorized",
                            "code": 401
                          }
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
              "msg": "Logged Out",
              "code": 401
            }
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