var express = require('express'); // require the express framework
var app = express();
var mysql = require('mysql'); // require the mysql module

// Create a connection to the MySQL database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name'
});

// Connect to the database
connection.connect(function(err) {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});

// Endpoint to Get a list of users
app.get('/getUsers', function(req, res){
    connection.query('SELECT * FROM users', function (error, results, fields) {
        if (error) throw error;
        console.log('Fetched users from database: ', results);
        res.json(results);
    });
});

// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("REST API demo app listening at http://%s:%s", host, port);
});
