const user = require("express").Router();
user.route("/").post(require('./bill'))

module.exports = user;