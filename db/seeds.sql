INSERT INTO department (dept)
VALUES ("Human Resources"), ("Sales"), ("IT"), ("Software Engeineering");


INSERT INTO roles (title, salary, department_id)
VALUES ("HR Recruiter", 70000, 1), 
        ("Sales Associate", 55000, 2),
         ("Tech Support", 55000, 3),
         ("Web Developer", 120000, 4),
         ("Software Engineer", 120000, 4),
         ("Developer Manager", 130000, 4),
         ("Lead Developer", 170000, 4);


INSERT INTO employees (first_name, last_name, roles_id, manager_id)
VALUES ("Bill", "Lumbergh", 4, 1), ("Ryan", "Howard", 4,2);

INSERT INTO employees (first_name, last_name, roles_id)
VALUES  ("Bob", "Porter", 1),
        ("Bob", "Slydell", 1),
        ("Peter", "Gibbons", 4),
        ("Michael", "Bolton", 4),
        ("Samir", "Nagheenanaj", 4),
        ("Milton", "Waddams", 2),
        ("Drew", "Oface", 2),
        ("Tom", "Smykowski", 3),
        ("Dom", "Portwood", 3);