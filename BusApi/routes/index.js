var express = require('express');
var router = express.Router();

//Database Conection Mysql
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'BusSystem'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getCredit', function (req, res) {
  connection.query('SELECT * FROM credit', function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });
})

router.post('/insertCredit', function (req, res) {
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

router.post('/loginCheck', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  sQuery = "SELECT * FROM user WHERE alias = '" + req.body.alias + "' AND password = '" + req.body.password + "';" 
  connection.query(sQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });  
})

module.exports = router;
