const user = require("express").Router();

user.use("/user_update",require('./user_update/index'))
user.use("/product",require('./products/index'))
user.use("/report",require('./report/index'))
user.use("/image",require('./image/index'))
user.use("/bill",require('./bill/index'))
user.use("/bills",require('./bills/index'))
user.use("/frontpage",require('./frontpage/index'))
module.exports = user;

