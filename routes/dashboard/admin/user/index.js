const admin = require("express").Router();
admin.route("/get1").post(require('./user'))
admin.route("/update").post(require('./user'))
admin.route("/get").post(require('./user'))
admin.route("/delete").post(require('./user'))
module.exports = admin;