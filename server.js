const inquirer = require('inquirer');
const mysql = require('mysql2');
//library to display tables in the console
const table = require('cli-table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db'
    }
  );

  db.connect(function(err){
    if (err)
    console.log(err)
  });





// let questionsArray = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'];


// //array of questions prompting user for input
// const questions = [
//     {
//         type: 'list',
//         name: 'task',
//         message: 'What would you like to do?',
//         choices: questionsArray,
//     },
// ];

// const departmentAdd = [
//     {
//         type: 'input',
//         message: 'Enter the name of the department.',
//         name: 'department',
//     },
// ];

// const roleAdd = [
//     {
//         type: 'input',
//         message: 'Enter the role you would like to add.',
//         name: 'role',
//     },
// ];


// function init() {
//     inquirer.prompt(questions)
//     .then(function(answer) {
//         if (task === 'View All Departments') {
//             //**write function to view all departments */
//             init();
//         } else if (task === 'View All Roles') {
//             //**write function to view all roles */
//             init();
//         } else if (task === 'View All Employees') {
//             //**write function to view all employees */
//             init();
//         } else if (task === 'Add a Department') {
//             //**write function to add department to table */
//             init();
//         } else if (task === 'Add a Role') {
//             //**write a function to add a role */
//             init();
//         } else if (task === 'Add an Employee') {
//             //**write a function to add an employee */
//             init();
//         } else if (task === 'Update an Employee Role') {
//             //**write a function to update an employee role */
//         } else {
//             init ();
//         }
//     });
// }    


//view all departments
db.query(`Select * from department`, (err,result) => {
    if (err) throw err;
    console.table(result);
});

//view all roles
db.query(`Select * from role`, (err,result) => {
    if (err) throw err;
    console.table(result);
});

//view all employees
db.query(`Select * from employee join role on employee.role_id = role.title`, (err,result) => {
    if (err) throw err;
    console.table(result);
});


    