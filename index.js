// const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
// const queryFunctions = require('./queryFunctions')
const { allDepts } = require('./queryFunctions')
// Connect to database
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // MySQL username,
//         user: 'root',
//         password: 'root',
//         database: 'emp_tracker_db'
//     },
//     console.log(`Connected to the database.`)
// );
const opt = ["ALL_DEPT", "ALL_ROLES"];
function startApp() {
    inquirer.prompt([
        {
            type: "list",
            name: "userview",
            message: "What you want to see?",
            choices: opt
        }
    ])
        .then((ans) => {
            console.log(ans);
            switch (ans.userview) {
                case opt[0]:
                    // queryFunctions.allDepts();
                    allDepts();
                    break;

                default:
                    break;
            }
        })
}

startApp();

// function allDepts() {
//     db.query('SELECT * FROM department', function (err, results) {
//         console.log(results);
//         startApp();
//     });
// }


