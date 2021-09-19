DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

INSERT INTO department (name)
VALUES 
('Sales'),
('Human Resources'),
('Enginering'),
('Legal');

INSERT INTO role (title, role_id, department_id, salary)