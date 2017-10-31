var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'BusSystem'
});
  

const express = require('express')
bodyParser = require('body-parser');
const app = express()

//
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/getCredit', function (req, res) {
  connection.query('SELECT * FROM credit', function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });
})

app.post('/insertCredit', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  console.log(req.body.mount);
  console.log(req.body.typePayment);

  res.send("");
  //connection.connect();
  /*var sQuery = "INSERT INTO `credit`(`mount`, `type_payment`) VALUES (" + mount + ",'" + typePayment + "')";
  connection.query(sQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });
  //connection.end();
    //res.send('Hello World test!')*/
})

app.post('/loginCheck', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  sQuery = "SELECT * FROM user WHERE alias = '" + req.body.alias + "' AND password = '" + req.body.password + "';" 
  connection.query(sQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });  
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})