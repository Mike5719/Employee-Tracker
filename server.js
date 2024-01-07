const inquirer = require('inquirer');
const mysql = require('mysql2');
//library to display tables in the console
const table = require('cli-table');


const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'company_db',
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
//             return viewDepartments();
//             init();
//         } else if (task === 'View All Roles') {
//             return viewRoles();
//             init();
//         } else if (task === 'View All Employees') {
//             return viewEmployees();
//             init();
//         } else if (task === 'Add a Department') {
//             return addDepartment();
//             init();
//         } else if (task === 'Add a Role') {
//             return addRole();
//             init();
//         } else if (task === 'Add an Employee') {
//             return addEmployee();
//             init();
//         } else if (task === 'Update an Employee Role') {
//             //**write a function to update an employee role */
//         } else {
//             init ();
//         }
//     });
// }    


// //view all departments
// const viewDepartments = () => {
// db.query(`Select * from department`, (err,result) => {
//     if (err) throw err;
//     console.table(result);
// });
// };

// //view all roles
// const viewRoles = () => {
// db.query(`Select * from role`, (err,result) => {
//     if (err) throw err;
//     console.table(result);
// });
// };

// //view all employees
// const viewEmployees = () => {
// db.query(`Select * from employee join role on employee.role_id = role.id`, (err,result) => {
//     if (err) throw err;
//     console.table(result);
// });
// };

// //add a department
// const addDepartment = () => {
//     inquirer.prompt([{
//         type: 'input',
//         message: 'Enter Department you would like to add.',
//         name: 'departmentAdd',
//     }])
//     .then((input) => {
//         db.query(`INSERT INTO department (name) VALUES (?)`, input.departmentAdd, (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(`Department ${input.departmentAdd} has been added.`);
//         });
//     });
// };


// //add a role
// const addRole = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: 'Enter Role you would like to add.',
//             name: 'RoleAdd',
//         },
//         {   
//             type: 'input',
//             message: 'Enter the salary for the role.',
//             name: 'SalaryAdd',
//         },
//         {
//             type: 'list',
//             message: 'Enter which department this role is in.', //TODO: figure out how to list current departments for user to choose from
//             name: 'RoleAddDepartment',
//             choices: [ 1, 2 ],
//         },
// ])
//     .then((input) => {
//         db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [input.RoleAdd, input.SalaryAdd, input.RoleAddDepartment], (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(`Role ${input.RoleAdd} with salary ${input.SalaryAdd} has been added to department ${input.RoleAddDepartment}.`);
//         });
//     });
// };




// //add an employee
// const addEmployee = () => {
//     inquirer.prompt([
//         {
//             type: 'input',
//             message: "Enter the employee's first name.",
//             name: 'firstName',
//         },
//         {   
//             type: 'input',
//             message: "Enter the employee's last name.",
//             name: 'lastName',
//         },
//          //TODO: figure out how to list existing role_id's and manager_id's for user to choose from
//         {
//             type: 'input',
//             message: "Enter the employee's role.",
//             name: 'employeeRole',
//         },
//         {
//             type: 'input',
//             message: "Enter the employee's manager",
//             name: 'employeeManager',
//         },
// ])
//     .then((input) => {
//         db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [input.firstName, input.lastName, input.employeeRole, input.employeeManager], (err, result) => {
//         if (err) {
//             console.log(err);
//         }
//         console.log(`${input.firstName} ${input.lastName} with role ${input.employeeRole} and manager ${input.employeeManager} has been added.`);
//         });
//     });
// };


//update employee role
const updateEmployee = () => {
    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update.',
            name: 'employeeUpdate',
            choices: [1, 2, 3], //figure out how to list employees currently in employee table
        },
        {
            type: 'list',
            message: 'What is their new role?', 
            name: 'roleUpdate',
            choices: [1, 2],  //TODO: figure out how to list all role_id options in employee table
        },
])
    .then((input) => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [input.roleUpdate, input.employeeUpdate], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`The role has been updated to ${input.roleUpdate} for employee ${input.employeeUpdate}.`);
        });
    });
};

updateEmployee();