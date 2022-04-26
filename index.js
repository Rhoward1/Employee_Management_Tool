
var mysql = require("mysql2");
const cTable = require("console.table");
const inquirer = require("inquirer");
const { promisify } = require("util")

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
  console.log("=======================================================================");
  console.log("============    Employee Tracker Tool ... By Ryan Howard    ============");
  console.log("=======================================================================");
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
        "Add Employee?",
        "Add Role?",
        "Add Department?",
        "Update Employee",
      ]
    }
  ]).then(function (val) {
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
    function (err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
}
// View by Roles //
function viewAllRoles() {
  connection.query("SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN roles ON employees.roles_id = roles.id;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
}
// View By Departments //
function viewAllDepartments() {
  connection.query("SELECT employees.first_name, employees.last_name, department.dept AS Department FROM employees JOIN roles ON employees.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employees.id;",
    function (err, res) {
      if (err) throw err
      console.table(res)
      startPrompt()
    })
}

var roleArray = [];
function selectRole() {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      roleArray.push(res[i].title);
    }

  })
  return roleArray;
}

var managersArray = [];
function selectManager() {
  connection.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL", function (err, res) {
    if (err) throw err
    for (var i = 0; i < res.length; i++) {
      managersArray.push(res[i].first_name);
    }

  })
  return managersArray;
}
// Add Employee //
function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter the first name of the Employee."
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter the last name of the Employee "
    },
    {
      name: "role",
      type: "list",
      message: "What is their role? ",
      choices: selectRole()
    },
    {
      name: "manager",
      type: "rawlist",
      message: "Who is their manager?",
      choices: selectManager()
    }
  ]).then(function (val) {
    var roleId = selectRole().indexOf(val.role) + 1
    var managerId = selectManager().indexOf(val.manager) + 1
    connection.query("INSERT INTO employees SET ?",
      [{
        first_name: val.firstName,
        last_name: val.lastName,
        manager_id: managerId,
        roles_id: roleId

      }], function (err) {
        if (err) throw err
        console.table(val)
        startPrompt()
      })

  })
}


// Update Employee
function updateEmployee() {
  connection.query("SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.roles_id = roles.id;", function (err, res) {
    if (err) throw err
    console.log(res)

    inquirer.prompt([
      {
        name: "lastName",
        type: "rawlist",
        choices: function () {
          var lastName = [];
          for (var i = 0; i < res.length; i++) {
            lastName.push(res[i].last_name);
          }
          return lastName;
        },
        message: "What is the last name of the Employee? ",
      },
      {
        name: "role",
        type: "rawlist",
        message: "What is the their new title? ",
        choices: selectRole()
      },

    ]).then(function (val) {
      var roleId = selectRole().indexOf(val.role) + 1
      connection.query("UPDATE employee SET WHERE ?",
        {
          last_name: val.lastName,
          roles_id: roleId,          
        },

        function (err) {
          // if (err) throw err //Still trying to fix this one
          console.table(val)
          startPrompt()
        })

    });
  });
}

// Add Employee Role //
function addRole() {
  connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles", function (err, res) {
    inquirer.prompt([
      {
        name: "Title",
        type: "input",
        message: "What is the roles Title?"
      },
      {
        name: "Salary",
        type: "input",
        message: "What is the Salary?"

      }
    ]).then(function (res) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: res.Title,
          salary: res.Salary,
        },
        function (err) {
          if (err) throw err
          console.table(res);
          startPrompt();
        }
      )

    });
  });
}

// Add Department //
function addDepartment() {

  inquirer.prompt([
    {
      name: "name",
      type: "input",
      message: "What Department would you like to add?"
    }
  ]).then(function (res) {
    var query = connection.query(
      "INSERT INTO department SET ? ",
      {
        dept: res.name

      },
      function (err) {
        if (err) throw err
        console.table(res);
        startPrompt();
      }
    )
  })
}