let nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "studenttestuser3@gmail.com",
    pass: "LOgin@digispoc"
  }
});
module.exports.login = async function (email_id, link) {

  try {
    let rand = Math.floor(100000 + Math.random() * 900000);
    let n = rand.toString();

    let mailOptions = {
      from: "Passport2Immunity",
      to: email_id,
      html: "Hello,<br> Please Click on the link to verify your email by Entering this OTP " + n + ".<br><a href=" + link + ">Click here to verify</a>",
      subject: 'Passport2Immunity  Account Verification'

    };
    await transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return "rand"
      } else {
        console.log('Email sent: ' + info.response);
        return rand
      }
    });
  }
  catch (error) {
    console.log("error" + error)
    return "rand"
  }
}
// module.exports.login = async function (email_id) {
//   try {
//     let res = await Auth(email_id, "Passport2Immunity");
//     let res1 = await res;
//     console.log(res);
//     console.log(res.mail);
//     console.log(res.OTP);
//     console.log(res.success);
//     return (res1)
//   } catch (error) {
//     console.log("error" + error);
//   }
// }

