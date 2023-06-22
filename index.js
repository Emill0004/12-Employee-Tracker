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
            if (data.initial == 'View All Departments') {
                showDept();
                init();
            } else if (data.initial == 'View All Roles') {
                showRole();
                init();
            } else if (data.initial == 'View All Employees') {
                showEmpl();
                init();
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

function showDept() {
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        console.table(result);
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
    })
};

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
            idArr.push(result[i].id)
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

function addEmpl() {
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
                choices: ['WIP', 'WIP', 'WIP', 'WIP'],
                name: 'emplRole',
            },
            {
                type: 'list',
                message: "Who is the employee's manager?",
                choices: ['WIP', 'WIP', 'WIP', 'WIP'],
                name: 'emplMgr', 
            }
        ])
        .then((data) => {
            console.log(`Added ${data.fName} ${data.lName} to the database`);
            init();
        })
}

function updtEmpl() {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee's role do you want to update?",
                choices: ['WIP', 'WIP', 'WIP', 'WIP'],
                name: 'updtEmpl',
            },
            {
                type: 'list',
                message: 'Which role do you want to assign the selected employe?',
                choices: ['WIP', 'WIP', 'WIP', 'WIP'],
                name: 'updtRole',
            },
        ])
        .then((data) => {
            console.log(`Updated employee's role`);
            init();
        })
}

init();

/*
TODO:
finish setting up inquirer
    have a db.query to return an array of the values you need
*/