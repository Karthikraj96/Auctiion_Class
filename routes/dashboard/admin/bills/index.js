const admin = require("express").Router();

admin.route("/").post(require('./bills'))

module.exports = admin;