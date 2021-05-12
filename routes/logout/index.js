const logout = require("express").Router();

logout.route("/").post(require('./logout'))

module.exports = logout;