1. Add your .gitignore file to the root of the project
    -node_modules

2. Create a db folder to hold all your database files, including the connection to your SQL database
    - Use your mysql shell username and password
    -Reference Activities that do the same thing -- these are in the server.js file usually
    - Import mysql2 into the connection file
    - Export your connection to the db

3. Build your schema.sql using the README instructions and charts
    - Create a database -- employees
    - Create a departments table
    - Create a roles table
    - Create an employee table

4. Create a seed.sql file that adds data to the tables

5. Create a main index.js file
    -Import inquirer, console.table, db connection 
    -Create a function to start the inquirer prompts and display the main menu
    -Use conditionals to run appropriate function based on the user's choice in the main menu

6. Create functions to handle each of the following (use SQL queries to accomplish this):
    - View all employees
    - View all employees by department
    - View all employees by manager
    - Add employee
    - Add department
    - Add role
    - Remove employee
    - Remove role
    - Update employee role
    - Update employee manager
    - Exit

7. Call the function to start the prompts 