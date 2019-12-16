var express = require('express');
var app = express();

app.get('/', function (req, res) {
   
    var sql = require("mssql");

    // config for your database
    var config = {
        host: "localhost",
        user: 'root',
        password: '123456789',
        database: 'urine' ,
        dialect: 'mysql',
        pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
        }
    };

    // connect to your database
   sql.ConnectionPool(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from table_urine', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            
            res.send(recordset);
            
        });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});