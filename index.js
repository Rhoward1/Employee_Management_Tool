
var mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const {promisify} = require("util")

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "rootroot",
    database: "employee_tracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    connection.queryPromise = promisify(connection.query)
    startPrompt()
});

function startPrompt() {
    inquirer.prompt([
    {
    type: "list",
    message: "What would you like to do?",
    name: "choice",
    choices: [
              "View All Employees?", 
              "View All Employee's By Roles?",
              "View all Emplyees By Deparments", 
              "Update Employee",
              "Add Employee?",
              "Add Role?",
              "Add Department?"
            ]
    }
]).then(function(val) {
        switch (val.choice) {
            case "View All Employees?":
              viewAllEmployees();
            break;
    
          case "View All Employee's By Roles?":
              viewAllRoles();
            break;
          case "View all Emplyees By Deparments":
              viewAllDepartments();
            break;
          
          case "Add Employee?":
                addEmployee();
              break;

          case "Update Employee":
                updateEmployee();
              break;
      
            case "Add Role?":
                addRole();
              break;
      
            case "Add Department?":
                addDepartment();
              break;
    
            }
    })
}
// View All Employees //
function viewAllEmployees() {
    connection.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.dept, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.roles_id INNER JOIN department on department.id = roles.department_id left join employees e on employees.manager_id = e.id;", 
    function(err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
  })
}
// View by Roles //
function viewAllRoles() {
  connection.query("SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN roles ON employees.roles_id = roles.id;", 
  function(err, res) {
  if (err) throw err
  console.table(res)
  startPrompt()
  })
}
// View By Departments //
function viewAllDepartments() {
  connection.query("SELECT employees.first_name, employees.last_name, department.dept AS Department FROM employees JOIN roles ON employees.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employees.id;", 
  function(err, res) {
    if (err) throw err
    console.table(res)
    startPrompt()
  })
}

