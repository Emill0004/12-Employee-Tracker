const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: '95882494',
      database: 'company_db'
    },
);

// Main function that calls other functions based on input.
function init() {
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'What would you like to do?',
                choices: [
                    'View All Departments',
                    'View All Roles',
                    'View All Employees',
                    'Add a Department',
                    'Add a Role',
                    'Add an Employee',
                    'Update an Employee Role',
                    'Quit'
                ],
                name: 'initial',
            }
        )
        .then((data) => {
            // If statements to call subsequent functions
            if (data.initial == 'View All Departments') {
                showDept();
            } else if (data.initial == 'View All Roles') {
                showRole();
            } else if (data.initial == 'View All Employees') {
                showEmpl();
            } else if (data.initial == 'Add a Department') {
                addDept();
            } else if (data.initial == 'Add a Role') {
                addRole();
            } else if (data.initial == 'Add an Employee') {
                addEmpl();
            } else if (data.initial == 'Update an Employee Role') {
                updtEmpl();
            }
        })
}

// The following three functions query the database and return tables with the retrieved infomation
function showDept() {
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(result);
        init();
    })
};

function showRole() {
    const sql = `SELECT * FROM role;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(result);
        init();
    })
};

function showEmpl() {
    const sql = `SELECT * FROM employee;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(result);
        init();
    })
};

// Add a department based on user input
function addDept() {
    inquirer
        .prompt(
            {
                type: 'input',
                message: 'What is the name of the department?',
                name: 'deptName',
            }
        )
        .then((data) => {
            const sql = `INSERT INTO department (name)
                VALUES (?)`;
            const params = [data.deptName];

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
            })
            console.log(`Added ${data.deptName} to the database`);
            init();
        })
        
};

// Adds a role based on user input
function addRole() {
    const nameArr = [];
    const idArr = [];

    db.query(`SELECT * FROM department;`, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        for (let i = 0; i < result.length; i++) {
            nameArr.push(result[i].name);
            idArr.push(result[i].id);
        }
    });

    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the name of the role?',
                name: 'roleName',
            },
            {
                type: 'input',
                message: 'What is the salary of the role?',
                name: 'roleSalary',
            },
            {
                type: 'list',
                message: 'Which department does the role blong to?',
                choices: nameArr,
                name: 'roleDept',
            }
        ])
        .then((data) => {
            let deptId;
            for (let i = 0; i < nameArr.length; i++) {
                if (nameArr[i] == data.roleDept) {
                    deptId = i + 1;
                }
            }
            const sql = `INSERT INTO role (title, salary, department_id)
                VALUES (?, ?, ?)`;
            const params = [data.roleName, data.roleSalary, deptId];
            

            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
            })                
            console.log(`Added ${data.roleName} to the database`);
            init();
        })
}

// Adds an employee based on user input.
function addEmpl() {
    const roleArr = [];
    const roleIdArr = [];
    const managerArr = [];
    const managerIdArr = [];

    db.query(`SELECT * FROM role;`, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        for (let i = 0; i < result.length; i++) {
            roleArr.push(result[i].title);
            roleIdArr.push(result[i].id);
        }
    });

    db.query(`SELECT * FROM employee;`, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        for (let i = 0; i < result.length; i++) {
            managerArr.push(`${result[i].first_name} ${result[i].last_name}`);
            managerIdArr.push(result[i].id);
        }
    });

    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the employee's first name?",
                name: 'fName',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'lName',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                choices: roleArr,
                name: 'emplRole',
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                choices: managerArr,
                name: 'emplMgr', 
            }
        ])
        .then((data) => {
            let roleId;
            let managerId;
            for (let i = 0; i < roleArr.length; i++) {
                if (roleArr[i] == data.emplRole) {
                    roleId = i + 1;
                }
            }
            for (let i = 0; i < managerArr.length; i++) {
                if (managerArr[i] == data.emplMgr) {
                    managerId = i + 1;
                }
            }
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES (?, ?, ?, ?)`;
            const params = [data.fName, data.lName, roleId, managerId];
            
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
            })
            console.log(`Added ${data.fName} ${data.lName} to the database`);
            init();
        })
}

// Updates an existing employee's role
async function updtEmpl() {
    let [rows] = await db.promise().query(`SELECT * FROM role;`);
    let roleArr = rows.map(row => row.title);
    let roleIdArr = rows.map(row => row.id);

    let [employees] = await db.promise().query(`SELECT * FROM employee;`);
    let employeeArr = employees.map(employee => (`${employee.first_name} ${employee.last_name}`))
    let employeeIdArr = employees.map(employee => employee.id);
    
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?",
                choices: employeeArr,
                name: 'updtEmpl',
            },
            {
                type: 'list',
                message: 'Which role do you want to assign the selected employe?',
                choices: roleArr,
                name: 'updtRole',
            },
        ])
        .then((data) => {
            let employeeId;
            let roleId;
            for (let i = 0; i < roleArr.length; i++) {
                if (roleArr[i] == data.updtRole) {
                    roleId = i + 1;
                    console.log(roleId);
                }
            }
            for (let i = 0; i < employeeArr.length; i++) {
                if (employeeArr[i] == data.updtEmpl) {
                    employeeId = i + 1;
                    console.log(employeeId);
                }
            }
            const sql = `UPDATE employee SET role_id = (?) WHERE id = (?);`;
            const params = [roleId, employeeId];
            
            db.query(sql, params, (err, result) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
            })
            console.log(`Updated employee's role`);
            init();
        })
}

init();