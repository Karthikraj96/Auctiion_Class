const admin = require("express").Router();

admin.route("/").post(require('./bill'))
admin.route("/download").post(require('./bill'))
module.exports = admin;