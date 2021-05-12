const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors());
require('dotenv').config()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const connection = require('./db');
function connect() {
  connection.connect(function (err) {
    err ? console.log(err) : console.log("connected  to db")
  })
}
connect()
require('./routes')(app);

app.listen(3000, function () {
  console.log("server stated at http://192.168.1.31:3000 or http://localhost:3000")
})