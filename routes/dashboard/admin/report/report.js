const router = require('express').Router()
const connection = require('../../../../db')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public/filesuploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `passport2immunity-user_report-${file.originalname}`);
  },
});
let report_upload = multer({ storage: storage })
const decode = require('../../../../token').tokendecode
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
              let stmt = 'select reports.test_id ,user_info.first_name,user_info.last_name,products.test_type,hospitals.hospital_name,reports.test_datetime,reports.test_status from reports inner join user_info on reports.user_id= user_info.user_id inner join hospitals on reports.hospital_id = hospitals.hospital_id inner join products on reports.product_id = products.product_id '
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
module.exports = router.post('/upload', report_upload.single("user_report"), function (req, response) {
  let token = req;
  let { test_id } = req.body
  let path = req.file.path
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
              let stmt = 'insert into user_report_src (test_id,path) values (?,?)'
              let values = [test_id, path]
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
                "msg": "Logged Out",
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
      } else {
        let data = {
          "msg": "Not an admin user",
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
  } else {
    let data = {
      "msg": "Unauthorized",
      "code": 401
    }
    response.status(401).send(data)
  }
})
module.exports = router.post('/status_update', function (req, response) {
  let token = req;
  let { test_id, covid_status, test_status } = req.body
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
              let stmt = 'update reports set covid_status=?,test_status=? where test_id=?'
              let values = [covid_status, test_status, test_id]
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
                "msg": "Logged Out",
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
          "msg": "Not an admin user",
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
  } else {
    let data = {
      "msg": "Unauthorized",
      "code": 401
    }
    response.status(401).send(data)
  }
})
module.exports = router.post('/update', function (req, response) {
  let token = req;
  let { hospital_id, product_id, user_id, covid_status, test_status, test_datetime, cmt_title, cmt_description } = req.body
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
              let stmt = 'insert into reports (hospital_id,product_id,user_id,covid_status,test_status,test_datetime,cmt_title,cmt_description) values (?,?,?,?,?,?,?,?)'
              let values = [hospital_id, product_id, user_id, covid_status, test_status, test_datetime, cmt_title, cmt_description]
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
                "msg": "Logged Out",
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
          "msg": "Not an admin user",
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
module.exports = router.post('/comment_update', function (req, response) {
  let token = req;
  let { test_id, cmt_title, cmt_description, cmt_datetime } = req.body
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
              let stmt = 'update reports set cmt_title=?,cmt_description=?,cmt_datetime= ? where test_id=?'
              let values = [cmt_title, cmt_description, cmt_datetime, test_id]
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
                  let stmt = 'select cmt_title,cmt_description,cmt_datetime from reports where test_id=?'
                  connection.query(stmt, test_id, function (err, rows, fields) {
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
              "msg": "Unauthorized",
              "code": 401
            }
            response.status(401).send(data)
          }
        })
      }
      else {
        let data = {
          "msg": "Not an admin user",
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
      "msg": "Invalid Token",
      "code": 401
    }
    response.status(401).send(data)
  }
})
module.exports = router.post('/get1', function (req, response) {
  let token = req;
  let { test_id } = req.body
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
              let stmt = 'select reports.cmt_title,cmt_description,cmt_datetime,reports.test_id ,user_info.first_name,user_info.last_name,products.test_type,hospitals.hospital_name,reports.test_datetime,reports.test_status from reports inner join user_info on reports.user_id= user_info.user_id inner join hospitals on reports.hospital_id = hospitals.hospital_id inner join products on reports.product_id = products.product_id where reports.test_id = ?'
              connection.query(stmt, test_id, function (err, rows, fields) {
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
              "msg": "Unauthorized",
              "code": 401
            }
            response.status(401).send(data)
          }
        })
      }
      else {
        let data = {
          "msg": "Not an admin user",
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
module.exports = router.post('/report_download', function (req, response) {
  let token = req;
  let { test_id } = req.body
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
              let stmt = 'select path from user_report_src where test_id =?'
              connection.query(stmt, test_id, function (err, rows, fields) {
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
                    "path": rows[0].path,
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
              "msg": "Unauthorized",
              "code": 401
            }
            response.status(401).send(data)
          }
        })
      }
      else {
        let data = {
          "msg": "Not an admin user",
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