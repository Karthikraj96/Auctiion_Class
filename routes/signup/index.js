const signup = require("express").Router();

signup.route("/").post(require('./signup'))
signup.route("/otp").post(require('./signup'))
signup.route("/complete").post(require('./signup'))
signup.route("/back").post(require('./signup'))
module.exports = signup;