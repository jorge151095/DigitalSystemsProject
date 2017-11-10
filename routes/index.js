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

router.post('/getCredit', function (req, res) {
  sQuery = "SELECT * FROM `count` INNER JOIN credit ON count.creditId = credit.id INNER JOIN user ON user.id = count.userId WHERE alias = '"+req.body.alias+"'";
  connection.query(sQuery, function (error, results, fields) {
    console.log("getCredit:");
    console.log(results[0]);
    if (error) {res.send(results)};
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
  console.log(sQuery);
  connection.query(sQuery, function (error, results, fields) {
    if (error) {
      res.send(results)
    }else{
      connection.query("INSERT INTO `credit`(`mount`, `type_payment`) VALUES (500,1)", function (error, results, fields) {
        if (error) {res.send(results)
        }else{
          connection.query("SELECT * FROM `credit` ORDER BY id DESC ", function (error, results, fields) {
            var idcredit = results[0].id;
            console.log(idcredit);
            connection.query("SELECT * FROM `user` ORDER BY id DESC ", function (error, results, fields) {
              var iduser = results[0].id;
              console.log(iduser);
              connection.query("INSERT INTO `count`(`creditId`, `state`, `creationDate`, `userId`) VALUES ("+idcredit+",1,0,"+iduser+")", function (error, results, fields) {
                if(error){res.send(error)}else{res.send(JSON.stringify("OK"));}
              });
            });
          });
        }
      });
    }
  });  
})

router.post('/loginCheck', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  sQuery = "SELECT * FROM user WHERE alias = '" + req.body.alias + "' AND password = '" + req.body.password + "';" 
  console.log(sQuery);
  connection.query(sQuery, function (error, results, fields) {
    if (error){
      res.send(error);
    }else{
      console.log(results[0]);
      res.send(results[0]);
    }
  });  
})

router.post('/newPass', function (req, res) {
  sQuery = "UPDATE credit INNER JOIN `count` ON count.creditId = credit.id INNER JOIN user ON user.id = count.userId SET mount = mount -10 WHERE alias = '"+req.body.alias+"'";
  console.log(sQuery);
  connection.query(sQuery, function (error, results, fields) {
    if (error) {
      res.send(error);
    }else{
      res.send(JSON.stringify("OK"));
    }
  });
})

router.post('/findCredit', function (req, res) {
  sQuery = "SELECT COUNT(user.id) AS count FROM `count` INNER JOIN credit ON count.creditId = credit.id INNER JOIN user ON user.id = count.userId WHERE user.id = '"+req.body.alias+"' AND MOUNT > -10";
  console.log(sQuery);
  connection.query(sQuery, function (error, results, fields) {
    if (error) {
      res.send(error);
    }else{
      if(results[0].count == 1){
      res.send(JSON.stringify(1));}
      else{
        res.send(JSON.stringify(0));
      }
    }
  });
})

module.exports = router;
