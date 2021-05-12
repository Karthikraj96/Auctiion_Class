const router = require('express').Router()
const connection = require('../../../../db')
const decode = require('../../../../token').tokendecode
module.exports = router.post('/', function (req, response) {
  let { bill_id } = req.body
  let token = req;
  if (token) {
    if (bill_id) {
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
                let stmt = 'select user_id,payment_status,payment_date from bills where bill_id=?'
                connection.query(stmt, bill_id, function (err, rows, fields) {
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
                    let { user_id, payment_date, payment_status } = rows[0]
                    let stmt = 'select email_id from users where user_id =?'
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
                        let email_id = rows[0].email_id
                        let stmt = 'select first_name,last_name,address_line1,address_line2,phone_no from user_info where user_id =?'
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
                            let { first_name, last_name, address_line1, address_line2, phone_no } = rows[0]
                            let stmt = 'select item_name ,quantity,amount from  bill_items where bill_id = ?'
                            connection.query(stmt, bill_id, function (err, rows, fields) {
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
                                let name = first_name + ',' + last_name
                                let data1 = rows
                                let data2 = {
                                  "items_value": data1,
                                  "bill_id": bill_id,
                                  "payment_date": payment_date,
                                  "payment_status": payment_status,
                                  "name": name,
                                  "address1": address_line1,
                                  "address2": address_line2,
                                  "phone": phone_no,
                                  "email_id": email_id
                                }
                                let data = {
                                  "msg": "success",
                                  "data": data2,
                                  "code": 200
                                }
                                response.send(data)
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
        } else {
          let data = {
            "msg": "Not An Admin User",
            "code": 401
          }
          response.status(401).send(data)
        }
      }).catch(err => {
        console.log(err)
        let data = {
          "msg": "Token Invalid",
          "code": 401
        }
        response.status(401).send(data)

      })
    }
    else {
      let data = {
        "msg": "Invalid Bill_id",
        "code": 401
      }
      response.status(401).send(data)
    }
  }
  else {
    let data = {
      "msg": "Invalid Token",
      "code": 401
    }
    response.status(401).send(data)
  }
})
module.exports = router.post('/download', function (req, response) {
  let { test_id } = req.body
  let token = req;
  if (token) {
    if (test_id) {
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
                connection.query('select bills.bill_id,users.email_id,bills.payment_status,bills.payment_date,user_info.first_name,user_info.last_name,user_info.address_line1,user_info.address_line2,user_info.phone_no,bill_items.item_name,bill_items.quantity,bill_items.amount from bills inner join bill_items on bills.bill_id = bill_items.bill_id inner join user_info on user_info.user_id = bill_items.user_id inner join users on users.user_id=bills.user_id  where bill_items.test_id = ?', test_id, function (err, rows, fields) {
                  if (err) {
                    console.log(err)
                    let data = {
                      "msg": "Unauthorized",
                      "code": 401
                    }
                    response.status(401).send(data)
                  }
                  else if (rows.length > 0) {
                    let items = {
                      "item_name": rows[0].item_name,
                      "quantity": rows[0].quantity,
                      "amount": rows[0].amount
                    }
                    let name = rows[0].first_name + rows[0].last_name
                    let data = {
                      "items_value": items,
                      "bill_id": rows[0].bill_id,
                      "payment_date": rows[0].payment_date,
                      "payment_status": rows[0].payment_status,
                      "name": name,
                      "address1": rows[0].address_line1,
                      "address2": rows[0].address_line2,
                      "phone": rows[0].phone_no,
                      "email_id": rows[0].email_id
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
                  "msg": "Logged Out",
                  "code": 401
                }
                response.status(401).send(data)
              }
            }
            else {
              let data = {
                "msg": "Logged Out ",
                "code": 401
              }
              response.status(401).send(data)
            }
          })
        }
        else {
          let data = {
            "msg": "Unauthorized ",
            "code": 401
          }
          response.status(401).send(data)
        }
      }).catch(err =>{
        console.log(err)
        let data = { "msg": "Token is Not Valid", "code": 401 }
                        response.status(401).send(data)
    })
    } else {
      let data = {
        "msg": "Test ID Is Missing ",
        "code": 401
      }
      response.status(401).send(data)
    }
  }
  else {
    let data = {
      "msg": "Invalid Token ",
      "code": 401
    }
    response.status(401).send(data)
  }
})