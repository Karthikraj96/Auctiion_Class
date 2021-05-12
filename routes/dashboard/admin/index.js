const admin = require("express").Router();

admin.use("/products",require('./products/index'))
admin.use("/hospitals",require('./hospitals/index'))
admin.use("/vaccine",require('./vaccine/index'))
admin.use("/user",require('./user/index'))
admin.use("/report",require('./report/index'))
admin.use("/bills",require('./bills/index'))
admin.use("/bill",require('./bill/index'))
admin.use("/frontpage",require('./frontpage/index'))
module.exports = admin;
