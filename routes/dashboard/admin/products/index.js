const admin = require("express").Router();
admin.route("/add").post(require('./products'))
admin.route("/update").post(require('./products'))
admin.route("/get").post(require('./products'))
admin.route("/delete").post(require('./products'))
module.exports = admin;