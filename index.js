const inquirer = require('inquirer');

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
                console.log('render department table');
                init();
            } else if (data.initial == 'View All Roles') {
                console.log('render role table');
                init();
            } else if (data.initial == 'View All Employees') {
                console.log('render employee table');
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
            console.log(`Added ${data.deptName} to the database`);
            init();
        })
}

function addRole() {
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
                choices: ['WIP', 'WIP', 'WIP', 'WIP'],
                name: 'roleDept',
            }
        ])
        .then((data) => {
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