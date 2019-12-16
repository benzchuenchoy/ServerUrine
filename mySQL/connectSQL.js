
var mysql = require('mssql');


var config = {
    host:"localhost",
    user:"root",
    password:"12345678",
    database: "urine"
};

/* con.connect(function(err){
if(err)throw err;
console.log("Connected Success!");
}); */

// connect to your database
mysql.connect(config, function (err) {

    if (err) console.log(err);

      // create Request object
      var request = new sql.Request();

    // query to the database and get the records
    request.query("select * from table_urine", function (err, recordset) {
            
        if (err) console.log(err)

        // send records as a response
        res.send(recordset);
        
    });

   // sql.close();
});