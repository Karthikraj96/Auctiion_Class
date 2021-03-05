const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const nsmarty = require('nsmarty');

app.set('view engine', "html");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
nsmarty.tpl_path = __dirname + '/public/tpl';
app.get("/", function(req, res){
   
    var   stream = nsmarty.assign('index.tpl');
    stream.pipe(res)
});
app.get("/index.html", function(req, res){
   
    var   stream = nsmarty.assign('index.tpl');
    stream.pipe(res)
});
app.listen(3004, function(){
    console.log("Server started on port:http://localhost:3004");
});