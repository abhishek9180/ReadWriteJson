var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));
app.get('/index.htm', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/addUser', urlencodedParser, function (req, res) {
   // body...
   resp = {
      name:req.body.name,
      email:req.body.email,
      mobile:req.body.mobile,
      designation:req.body.designation,
   };
   fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
      data = JSON.parse(data);
      data[data.length] = resp;
      fs.writeFile('users.json', JSON.stringify(data), function(err){
         if(err){
            return console.error(err);
         }
      })
      console.log(data);
      res.end(JSON.stringify(data));
   });
})

app.delete('/deleteUser', function (req, res) {

   // First read existing users.
   fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       data = JSON.parse( data );
       delete data[1];
       
       console.log( data );
       res.end( JSON.stringify(data));
   });
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)

})