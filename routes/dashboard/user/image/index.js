const user = require("express").Router();
user.route("/load").post(require('./image'))
user.route("/upload").post(require('./image'))
user.route("/delete").post(require('./image'))
module.exports = user;