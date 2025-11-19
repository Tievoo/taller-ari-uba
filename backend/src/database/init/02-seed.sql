INSERT INTO court_type (id, name, price)
VALUES
    ('futbol5', 'Futbol 5', 53000),
    ('futbol7', 'Futbol 7', 86000),
    ('tenis', 'Tenis', 30000);

INSERT INTO courts (id, name, court_type_id, image)
VALUES
    ('cancha-f5-1', 'Futbol 5 - Fondo', 'futbol5', 'https://i.imgur.com/crzlN8O.jpeg'),
    ('cancha-f5-2', 'Futbol 5 - Techada', 'futbol5', 'https://i.imgur.com/hOsDHeq.png'),
    ('cancha-t1', 'Tenis - 1', 'tenis', 'https://i.imgur.com/WdkoKDm.png');

-- Password is 'test' hashed with bcrypt
INSERT INTO users (email, first_name, last_name, password, role)
VALUES ('admin@admin.com', 'Test', 'User', '$2b$10$zKHMW2q5coM8iNyk.SFcauFHHOkI.muNu/QlnkRpMomXsqh6QkRgC', 'admin')