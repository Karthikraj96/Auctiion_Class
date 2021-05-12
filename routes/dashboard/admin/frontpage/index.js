const admin = require("express").Router();

admin.route("/total_users").post(require('./frontpage'))
admin.route("/total_revenue").post(require('./frontpage'))
admin.route("/total_test").post(require('./frontpage'))
admin.route("/most_test").post(require('./frontpage'))
admin.route("/most_selling").post(require('./frontpage'))
admin.route("/total_pending").post(require('./frontpage'))
admin.route("/updates").post(require('./frontpage'))
module.exports = admin;