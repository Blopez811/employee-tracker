const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password:'Blopez@811', 
    database: 'employee_tracker_db'
});
connection.connect(function(err){
    if(err) throw err
})
module.exports = connection