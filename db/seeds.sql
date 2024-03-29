INSERT INTO department (name)
VALUES  ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES  ("Sales Lead", 90000, 4),
        ("Salesperson", 80000, 4),
        ("Lead Engineer", 150000, 1),
        ("Software Engineer", 120000, 1),
        ("Account Manager", 160000, 2),
        ("Accountant", 125000, 2),
        ("Legal Team Lead", 250000, 3),
        ("Lawyer", 190000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("John", "Doe", 1, NULL),
        ("Mike", "Chan", 2, NULL),
        ("Ashley", "Rodriguez", 3, 1),
        ("Kevin", "Tupik", 4, NULL),
        ("Kunal", "Singh", 5, NULL),
        ("Malia", "Brown", 6, NULL),
        ("Sarah", "Lourd", 7, NULL),
        ("Tom", "Allen", 8, NULL);