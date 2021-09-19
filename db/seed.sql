
USE employee_tracker_db;

INSERT INTO department (name)
VALUES 
('Sales'),
('Finance'),
('Engineering'),
('Legal');

INSERT INTO role (title, department_id, salary)
VALUES
('Salesperson', 1, 70000),
('Accountant', 2, 75000),
('Software Engineer', 3, 90000),
('Lawyer', 4, 100000)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Smith')