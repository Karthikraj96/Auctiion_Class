const admin = require("express").Router();
admin.route("/get").post(require('./hospital'))
admin.route("/add").post(require('./hospital'))
admin.route("/update").post(require('./hospital'))
admin.route("/delete").post(require('./hospital'))
module.exports = admin;