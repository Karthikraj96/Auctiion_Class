const user = require("express").Router();
user.route("/no_test").post(require('./frontpage'))
user.route("/in_progress").post(require('./frontpage'))
user.route("/updates").post(require('./frontpage'))
user.route("/vaccine_add").post(require('./frontpage'))
user.route("/vaccine_get").post(require('./frontpage'))
module.exports = user;