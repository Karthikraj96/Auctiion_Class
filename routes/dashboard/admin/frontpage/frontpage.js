const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/total_users', function (req, response) {
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
              let active = "active"
              let stmt = 'SELECT COUNT(email_id) AS TotalUsers FROM users where user_mode = ?; '
              connection.query(stmt, active, function (err, rows, fields) {
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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
module.exports = router.post('/total_revenue', function (req, response) {
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
              let active = "active"
              let stmt = 'SELECT amount from bill_items; '
              connection.query(stmt, active, function (err, rows, fields) {
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
                  let revenue = rows.reduce((acc, val) => {
                    val.amount = Number(acc.amount) + Number(val.amount.split(',').reduce((a, v) => Number(a) + Number(v)))
                    return val
                  })
                  let data = {
                    "msg": "success",
                    "data": revenue,
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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
module.exports = router.post('/total_test', function (req, response) {
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
              let stmt = 'SELECT COUNT(test_id) AS TestTaken FROM reports; '
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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
module.exports = router.post('/total_pending', function (req, response) {
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
              let active = "Pending"
              let stmt = 'SELECT COUNT(test_id) AS TestPending FROM reports where test_status =?'
              connection.query(stmt, active, function (err, rows, fields) {
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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
module.exports = router.post('/most_test', function (req, response) {
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
            if (loggedin) {
              let stmt = 'SELECT state,city,count FROM hospitals order by count desc; '
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
                "msg": "Logged Out",
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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
module.exports = router.post('/most_selling', function (req, response) {
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
              let stmt = 'SELECT product_id,test_name,count FROM products order by count desc; '
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
                "msg": "Logged Out",
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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
              let stmt = 'SELECT reports.created_date,user_info.first_name,user_info.last_name,reports.product_id,reports.test_status FROM reports inner join user_info on reports.user_id=user_info.user_id order by reports.created_date desc'
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
    }).catch(err => {
      console.log(err)
      let data = { "msg": "Token is Not Valid", "code": 401 }
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