const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');
let employeesArr = ['John', 'Sam', 'Bob'];
let questions = [
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
    },
    {
        when: (res) => {
            if(res.selection == 'add a department') {
                 return true;
            } 
            else {
                return false;
            }
        },
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?'
    },
    {
        when: (res) => {
            if(res.selection == 'add a role') {
                 return true;
            } 
            else {
                return false;
            }
        },
        type: 'input',
        name: 'role',
        message: 'What is the name, salary and dapartment for the new role?'
    },
    {
        when: (res) => {
            if(res.selection == 'add an employee') {
                 return true;
            } 
            else {
                return false;
            }
        },
        type: 'input',
        name: 'employee',
        message: 'What is the new employees first name, last name, role, and manager?'
    },
    {
        when: (res) => {
            if(res.selection == 'update an employee role') {
                 return true;
            } 
            else {
                return false;
            }
        },
        type: 'list',
        name: 'updateEmployeeRole',
        message: 'Select an employee you would like to update.',
        choices: employeesArr
    },
   
];
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password:'Blopez@811', 
    database: 'employee_tracker_db'
})

 function startApp() { inquirer
    .prompt(
        questions
    )
    .then((answer) => {
        if(answer.selection == 'view all departments') {
            connection.query('SELECT * FROM department',
            function(err, results) {
                console.table(results);
                startApp();
            })
        };
        if(answer.selection == 'view all roles') {
            connection.query('SELECT * FROM role',
            function(err, results) {
                console.table(results);
                startApp();  
            })
        };
        if(answer.selection == 'view all employees') {
            connection.query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id',
            function(err, results) {
                console.table(results);
                startApp();  
            })
        };
        if(answer.selection == 'add a department') {
            console.log(answer.department);
            connection.query(`INSERT INTO department (name) VALUES ('${answer.department}');`);
            startApp();
        }

    })
}
    startApp()
    