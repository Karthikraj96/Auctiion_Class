const user = require("express").Router();
user.route("/get").post(require('./report'))
user.route("/get1").post(require('./report'))
user.route("/comment").post(require('./report'))
module.exports = user;