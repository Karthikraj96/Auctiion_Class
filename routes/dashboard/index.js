const user = require("express").Router();

user.use("/user", require('./user/index'))
user.use('/admin', require('./admin/index'))

module.exports = user