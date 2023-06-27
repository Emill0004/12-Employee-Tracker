-- Insert dummy data
INSERT INTO department (name)
VALUES ('Legal'),
       ('Sales'),
       ('Finance'),
       ('Engineering');

INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 75000, 2),
       ('Accountant', 80000, 3),
       ('Lawyer', 99999, 1),
       ('Software Developer', 10, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jimmy', 'Lawson', 1, NULL),
       ('Bob', 'Roberts', 2, 1),
       ('Robert', 'Roberts', 3, 1),
       ('Kenzie', 'Smith', 4, 1);