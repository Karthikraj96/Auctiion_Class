const admin = require("express").Router();
admin.route("/add").post(require('./vaccine'))
admin.route("/update").post(require('./vaccine'))
admin.route("/get").post(require('./vaccine'))
admin.route("/delete").post(require('./vaccine'))
module.exports = admin;