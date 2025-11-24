INSERT INTO court_type (name, price)
VALUES
    ('Futbol 5', 53000),
    ('Futbol 7', 86000),
    ('Tenis', 30000);

INSERT INTO courts (name, court_type_id, image)
VALUES
    ('Futbol 5 - Fondo', 1, 'https://i.imgur.com/crzlN8O.jpeg'),
    ('Futbol 5 - Techada', 1, 'https://i.imgur.com/hOsDHeq.png'),
    ('Tenis - 1', 3, 'https://i.imgur.com/WdkoKDm.png');

-- Password is 'test' hashed with bcrypt
INSERT INTO users (email, first_name, last_name, password, role)
VALUES ('admin@admin.com', 'Test', 'User', '$2b$10$zKHMW2q5coM8iNyk.SFcauFHHOkI.muNu/QlnkRpMomXsqh6QkRgC', 'admin')