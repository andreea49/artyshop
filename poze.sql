create database db_test encoding 'UTF-8' LC_COLLATE 'ro-RO-x-icu' LC_CTYPE 'ro_RO' TEMPLATE  template0;

CREATE USER "andy" WITH ENCRYPTED PASSWORD 'andy' ;
grant ALL PRIVILEGES on database db_test to andy ; 
grant ALL PRIVILEGES on ALL TABLES in schema public to andy;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO andy;

create type culoare_baza as ENUM('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'white', 'black', 'brown', 'mix');

create table if not exists art (
    id serial primary key,
    nume varchar(50) unique not null,
    descriere text,
    pret numeric(8,2),
    material varchar(50) not null,
    prezentare varchar(50) not null,
    greutate numeric(8,2),
    data_adaugare timestamp default current_timestamp,
    categorie culoare_baza default 'mix',
    culori varchar [],
    posta boolean not null default false,
    imagine varchar(300)
);

insert into art (nume, descriere, pret, material, prezentare, greutate, categorie, culori, posta, imagine) values

('Fullmetal', 'edward from fullmetal alchemist', 75.5, 'paper', 'rama', 4, 'red', '{"red", "yellow", "white", "black", "blue"}', True, 'p1.jpg'),
('Berries', 'graphic drawing of berries in pen', 20, 'glass', 'rama', 10, 'white', '{"black", "white"}', True, 'p2.jpg'),
('Sakura', 'a sakura branch, painted with light colors', 15.95, 'canvas', 'rama', 4, 'pink', '{"black", "white", "red", "pink"}', False, 'p3.jpg'),
('Koi', 'abstract drawing of tears as koi fish', 45.55, 'wood', 'nimic', 5, 'black', '{"black", "white"}', True, 'p4.jpg'),
('Captain America', 'a simple drawing of Captain America', 15, 'paper', 'nimic', 1, 'black', '{"black", "white"}', True, 'p5.jpg'),
('Feather', 'a steampunk version of a writing feather', 49.49, 'glass', 'rama', 6, 'black', '{"black", "white"}', False, 'p6.jpg'),
('Fox', 'watercolor painting of foxes and flowers', 35.50, 'paper', 'nimic', 1, 'orange', '{"red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "white", "black"}', True, 'p7.jpg'),
('Galaxy', 'a simple white on black painting of planets and stars', 10, 'paper', 'nimic', 1, 'white', '{"black", "white"}', True, 'p8.jpg'),
('Hunger Games', 'Hunger Games badges, each one from each book', 23, 'wood', 'husa', 3, 'yellow', '{"black", "white", "yellow"}', True, 'p9.jpg'),
('Bird', 'a humming bird with flower tail feathers', 12.34, 'canvas', 'husa', 4, 'black', '{"black", "white"}', False, 'p10.jpg'),
('Sunflower', 'watercolor paining of sunflowers', 31, 'paper', 'nimic', 13, 'yellow', '{"yellow", "white", "green", "brown", "orange" }', True, 'p11.jpg'),
('Beach', 'canvas painting of a beach in California', 42, 'canvas', 'rama', 76, 'blue', '{"blue", "white", "green", "brown" }', False, 'p12.jpg'),
('Yellow flowers', 'watercolor painting of random yellow flowers', 52, 'wood', 'rama', 34, 'yellow', '{"black", "white", "orange", "green"}', False, 'p13.jpg'),
('Forest', 'a black outline of a forest with a colorful and vibrant backgroung', 63, 'glass', 'husa', 15, 'mix', '{"black", "purple", "pink", "blue", "green" }', True, 'p14.jpg'),
('Supernatural', 'a fan made character from the show supernatural', 29.99, 'glass', 'rama', 4, 'black', '{"black", "white", "orange", "yellow", "blue" }', False, 'p15.jpg'),
('Balloon', 'an outline of a baloon filled with a galaxy theme', 55, 'wood', 'husa', 16, 'white', '{"black", "white", "pink", "purple", "blue" }', False, 'p16.jpg'),
('Bubbles', 'bubles vibrantly colored on black paper', 63, 'paper', 'husa', 12, 'black', '{"black", "white", "pink", "purple", "blue", "green", "red", "orange", "yellow" }', True, 'p17.jpg'),
('Sneakers', 'white cherry blossoms on pink sneakers', 60.50, 'other', 'nimic', 45, 'pink', '{"pink", "white", "brown" }', True, 'p18.jpg'),
('Roses', 'an acrylic painting of pink roses on canvas', 30, 'canvas', 'rama', 24, 'green', '{"pink", "green", "yellow", "white"}', False, 'p19.jpg'),
('Bird with flowers', 'a graphic drawing of a bird with flower feathers', 49, 'paper', 'nimic', 42, 'blue', '{"black", "white", "pink", "brown", "blue" }', True, 'p20.jpg');
