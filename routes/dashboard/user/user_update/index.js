const user = require("express").Router();
user.route("/").post(require('./user_update'))

module.exports = user;