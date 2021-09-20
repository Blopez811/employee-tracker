const inquirer = require('inquirer');
const cTable = require('console.table');
const connection = require('./db/connection');
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
        name: 'roleName',
        message: 'What is the name for the new role?'
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
        name: 'roleSalary',
        message: 'What is the salary for the new role?'
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
        name: 'roleDepartment',
        message: 'What is the department for the new role?'
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
        name: 'employeeFName',
        message: 'What is the new employees first name?'
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
        name: 'employeeLName',
        message: 'What is the new employees last name?'
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
        name: 'employeeRole',
        message: 'What is the new employees role?'
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
        name: 'employeeManager',
        message: 'Who is the new employees manager?'
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
        type: 'input',
        name: 'updateEmployeeName',
        message: 'What is the employee id of the employee you want to update?',

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
        message: 'What is the new role you would like to update the employee with?',
        choices: ['Salesperson', 'Accountant', 'Software Engineer', 'Lawyer']
    },
];


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
            connection.query('SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department ON role.department_id = department.id',
            function(err, results) {
                console.table(results);
                console.log(err)
                startApp();  
            })
        };
        if(answer.selection == 'view all employees') {
            connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,  manager.first_name AS managerfname, manager.last_name AS managerlname FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id',
            function(err, results) {
                console.table(results);
                console.log(err);
                startApp();  
            })
        };
        if(answer.selection == 'add a department') {
            connection.query(`INSERT INTO department (name) VALUES ('${answer.department}');`);
            startApp();
        };
        if(answer.selection == 'add a role') {
            connection.query(`INSERT INTO role (title, department_id, salary) VALUES ('${answer.roleName}', ${answer.roleDepartment}, '${answer.roleSalary}');`);
            startApp();
        };
        if(answer.selection == 'add an employee') {
            console.log(answer);
            connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.employeeFName}', '${answer.employeeLName}', '${answer.employeeRole}', '${answer.employeeManager}');`);
            startApp();
        }
        if(answer.selection == 'update an employee role') {
            console.log(answer);
            connection.query(`SELECT id FROM role WHERE title = '${answer.updateEmployeeRole}';`,
            function(err, results) {
                console.log(results[0].id);
                console.log(err);
                connection.query(`UPDATE employee SET role_id = ${results[0].id}
                WHERE id = ${answer.updateEmployeeName};`)
            });
            startApp()
        }
    })
}
    startApp()
    