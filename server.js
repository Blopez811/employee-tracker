const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

inquirer
    .prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'What would you like to do?',
            choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role']
        }
    ])
    .then((answer) => {
        console.log(answer);
    })