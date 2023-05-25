const inquirer = require('inquirer');
let bandaidFix = true;

// function init() {
//     if (bandaidFix) {
//         inquirer
//             .prompt([
//                 {
//                     type: 'list',
//                     message: 'What would you like to do?',
//                     choices: [
//                         'View All Departments',
//                         'View All Roles',
//                         'View All Employees',
//                         'Add a Department',
//                         'Add a Role',
//                         'Add an Employee',
//                         'Update an Employee Role',
//                         'Quit'
//                     ],
//                     name: 'initial',
//                 }
//             ])
//             .then((data) => {
//                 if (data.initial == 'Quit') {
//                     bandaidFix = false;
//                 }
//                 init();
//             })
//     }
// }

function init() {
    inquirer
        .prompt([
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
        ])
        .then((data) => {
            if (data.initial !== 'Quit') {
                init();
            }
        })
}

init();