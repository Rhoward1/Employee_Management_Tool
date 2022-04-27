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
VALUES  ("Bill", "Lumbergh", 4, 1),
        ("Ryan", "Howard", 4, 2),
        ("Bob", "Porter", 1, null),
        ("Bob", "Slydell", 1, null),
        ("Peter", "Gibbons", 4, null),
        ("Michael", "Bolton", 4, null),
        ("Samir", "Nagheenanaj", 4, null),
        ("Milton", "Waddams", 2, null),
        ("Drew", "Oface", 2, null),
        ("Tom", "Smykowski", 3, null),
        ("Dom", "Portwood", 3, null); 