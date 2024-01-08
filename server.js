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

//set query to be asynchronous and bind it to the object that it is being used in ie. "this" to refer to the object it is being used in.
const query = db.promise().query.bind(db.promise())



let questionsArray = ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role'];


// //array of questions prompting user for input
const questions = [
    {
        type: 'list',
        name: 'task',
        message: 'What would you like to do?',
        choices: questionsArray,
    },
];

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
//         if (answer.task === 'View All Departments') {
//             return viewDepartments();
//         } else if (answer.task === 'View All Roles') {
//             return viewRoles();
//         } else if (answer.task === 'View All Employees') {
//             return viewEmployees();
//         } else if (answer.task === 'Add a Department') {
//             return addDepartment();
//         } else if (answer.task === 'Add a Role') {
//             return addRole();
//         } else if (answer.task === 'Add an Employee') {
//             return addEmployee();
//         } else if (answer.task === 'Update an Employee Role') {
//             return updateEmployee();
//         } else {
//             init ();
//         }
//     });
// }    


function init() {
    inquirer.prompt(questions)
    .then(answer => {
        if (answer.task === 'View All Departments') {
            return viewDepartments();
        } else if (answer.task === 'View All Roles') {
            return viewRoles();
        } else if (answer.task === 'View All Employees') {
            return viewEmployees();
        } else if (answer.task === 'Add a Department') {
            return addDepartment();
        } else if (answer.task === 'Add a Role') {
            return addRole();
        } else if (answer.task === 'Add an Employee') {
            return addEmployee();
        } else if (answer.task === 'Update an Employee Role') {
            return updateEmployee();
        } else {
            init ();
        };
    });
}; 



// //view all departments
const viewDepartments = () => {
db.query(`Select * from department`, (err,result) => {
    if (err) throw err;
    console.table(result);
    init();
});
};


// //view all roles
const viewRoles = () => {
db.query(`Select * from role`, (err,result) => {
    if (err) throw err;
    console.table(result);
});
};

// //view all employees
const viewEmployees = () => {
db.query(`Select * from employee join role on employee.role_id = role.id`, (err,result) => {
    if (err) throw err;
    console.table(result);
});
};

// //add a department
const addDepartment = () => {
    inquirer.prompt([{
        type: 'input',
        message: 'Enter Department you would like to add.',
        name: 'departmentAdd',
    }])
    .then((input) => {
        db.query(`INSERT INTO department (name) VALUES (?)`, input.departmentAdd, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Department ${input.departmentAdd} has been added.`);
        });
    });
};


//add a role
const addRole = async () => {
    const [deptChoices] = await query(`SELECT * FROM department`);
    console.log(deptChoices);
    const newDeptChoices = deptChoices.map(({id,name}) => ({
        name:name,
        value:id
    }))
    console.log(newDeptChoices);
    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter Role you would like to add.',
            name: 'RoleAdd',
        },
        {   
            type: 'input',
            message: 'Enter the salary for the role.',
            name: 'SalaryAdd',
        },
        {
            type: 'list',
            message: 'Enter which department this role is in.',
            name: 'RoleAddDepartment',
            choices: newDeptChoices,
        },
])
    .then((input) => {
        console.log(input);
        db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`, [input.RoleAdd, input.SalaryAdd, input.RoleAddDepartment], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`Role ${input.RoleAdd} with salary ${input.SalaryAdd} has been added to department ${input.RoleAddDepartment}.`);
        });
    });
};


// // //add an employee
const addEmployee = async () => {
    const [roleChoices] = await query(`SELECT * FROM role`);
        console.log(roleChoices);
        const newRoleChoices = roleChoices.map(({id,title,salary,department_id}) => ({
            name:title,
            value:id,
            salary:salary,
            department_id:department_id   
        }))   
        console.log(newRoleChoices);
    const [managerChoices] = await query(`SELECT * FROM employee`);
        console.log(managerChoices);
        const newManagerChoices = managerChoices.map(({id,first_name,last_name,role_id,manager_id}) => ({
            id:id,
            name:`${first_name} ${last_name}`,
            role_id:role_id,
            value:manager_id          
        }))
        console.log(newManagerChoices);
    inquirer.prompt([
        {
            type: 'input',
            message: "Enter the employee's first name.",
            name: 'firstName',
        },
        {   
            type: 'input',
            message: "Enter the employee's last name.",
            name: 'lastName',
        },
        {
            type: 'list',
            message: "Enter the employee's role.",
            name: 'employeeRole',
            choices: newRoleChoices,
        },
        {
            type: 'list',
            message: "Enter the employee's manager",
            name: 'employeeManager',
            choices: newManagerChoices,
        },
])
    .then((input) => {
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [input.firstName, input.lastName, input.employeeRole, input.employeeManager], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`${input.firstName} ${input.lastName} has been added.`);
        });
    });
};


// //update employee role
const updateEmployee = async () => {
    const [empList] = await query(`SELECT * FROM employee`);
        console.log(empList);
        const newEmpList = empList.map(({id,first_name,last_name,role_id,manager_id}) => ({
            id:id,
            name:`${first_name} ${last_name}`,
            value:role_id,
            manager_id:manager_id          
        }))
    console.log(newEmpList);
    const [roleChoices] = await query(`SELECT * FROM role`);
            console.log(roleChoices);
            const newRoleChoices = roleChoices.map(({id,title,salary,department_id}) => ({
                name:title,
                value:id,
                salary:salary,
                department_id:department_id   
            }))   

    inquirer.prompt([
        {
            type: 'list',
            message: 'Which employee would you like to update.',
            name: 'employeeUpdate',
            choices: newEmpList,
        },
        {
            type: 'list',
            message: 'What is their new role?', 
            name: 'roleUpdate',
            choices: newRoleChoices,
        },
])
    .then((input) => {
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [input.roleUpdate, input.employeeUpdate], (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(`The employee role has been updated.`);
        });
    });
};

init();