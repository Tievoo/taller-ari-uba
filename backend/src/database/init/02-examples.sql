INSERT INTO court_type (id, name, price)
VALUES
    ('futbol5', 'Futbol 5', 20000),
    ('futbol7', 'Futbol 7', 25000),
    ('tenis', 'Tenis', 10000);

INSERT INTO courts (id, name, court_type_id)
VALUES
    ('cancha-f5-1', 'Futbol 5 - 1', 'futbol5'),
    ('cancha-f5-2', 'Futbol 5 - 2', 'futbol5'),
    ('cancha-t1', 'Tenis - 1', 'tenis');
