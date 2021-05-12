const admin = require("express").Router();
admin.route("/upload").post(require('./report'))
admin.route("/status_update").post(require('./report'))
admin.route("/update").post(require('./report'))
admin.route("/get").post(require('./report'))
admin.route("/get1").post(require('./report'))
admin.route("/comment_update").post(require('./report'))
admin.route("/report_download").post(require('./report'))
module.exports = admin;
