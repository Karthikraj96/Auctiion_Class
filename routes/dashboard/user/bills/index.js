const user = require("express").Router();
user.route("/").post(require('./bills'))

module.exports = user;