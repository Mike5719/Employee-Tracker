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