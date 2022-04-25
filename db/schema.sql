DROP DATABASE IF EXISTS employee_tracker_db;
CREATE database employee_tracker_db;

USE employee_tracker_db;


-- Department
USE employee_tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  dept VARCHAR(30),
  PRIMARY KEY (id)
);

-- Role
USE employee_tracker_db;

CREATE TABLE roles (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,2),
  department_id INT,
  PRIMARY KEY (id), 
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Employees
USE employee_tracker_db;

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  roles_id INT, 
  manager_id INT,
  PRIMARY KEY (id),
FOREIGN KEY (roles_id) REFERENCES roles(id),
FOREIGN KEY (manager_id) REFERENCES employees(id)
);