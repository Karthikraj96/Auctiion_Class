const signin = require("express").Router();

signin.route("/decode").post(require('./signin'))
signin.route("/").post(require('./signin'))
module.exports = signin;