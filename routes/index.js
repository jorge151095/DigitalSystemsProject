var express = require('express');
var router = express.Router();

//Database Conection Mysql
var mysql      = require('mysql');
/*//Remoto
  var connection = mysql.createConnection({
  host : "85.10.205.173",
  port : 3307,
  user     : 'jorge151095',
  password : '335878531',
  database : 'bussystem'
});
*/
  var connection = mysql.createConnection({
  host : "sql9.freesqldatabase.com",
  port : 3306,
  user     : 'sql9204108',
  password : 'mjTXcUADg5',
  database : 'sql9204108'
});
//Local
/*var connection = mysql.createConnection({
  host : "localhost",
  user     : 'root',
  password : '',
  database : 'BusSystem'
});*/
console.log(connection);

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

router.post('/insertUser', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  sQuery = "INSERT INTO `user`(`name`, `last name`, `alias`,`password`) VALUES ('"+req.body.name+"','"+req.body.lastName+"','"+req.body.alias+"','"+req.body.password+"')"; 
  connection.query(sQuery, function (error, results, fields) {
    if (error) throw error;
    res.send(results[0]);
  });  
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
