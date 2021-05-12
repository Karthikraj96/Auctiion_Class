const user = require("express").Router();

user.route("/selected").post(require('./products'))
user.route("/get").post(require('./products'))
user.route("/state").post(require('./products'))
user.route("/city").post(require('./products'))
user.route("/hospital").post(require('./products'))
user.route("/get_by_hospital").post(require('./products'))
module.exports = user;