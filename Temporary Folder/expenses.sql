-- THIS IS JUST TO TEST , DON'T USE IT ANYWHERE IN THE PROJECT

CREATE DATABASE track_expenses;
USE track_expenses;

-- DROP DATABASE track_expenses;
-- DROP TABLE expenses;

CREATE TABLE expenses (
	id INT UNSIGNED PRIMARY KEY,
    date_c DATE,
    category VARCHAR(30) NOT NULL,
    note VARCHAR(100),
    amount INT NOT NULL,
    user_id INT ,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE user (
	user_id INT PRIMARY KEY,
    user_name VARCHAR(30) NOT NULL,
    user_age INT
);

INSERT INTO expenses 
(id, date_c, category, note, amount, user_id)
VALUES
(1, "2025-10-19", "Food", "Spent for dinner with friends", 1200, 1),
(2, "2025-09-12", "Clothes", "Spent for winter shopping", 3000, 1),
(3, "2025-08-24", "Utilies", "Spent on utility bills", 10000, 2),
(4, "2025-08-02", "Transport", "Monthly expenses of metro", 3000, 3),
(5, "2025-07-25", "Entertainment", "Spent on a movie night",1000, 3);

INSERT INTO user
(user_id, user_name, user_age)
VALUES
(1, "Vansh",18),
(2, "Imran",19),
(3, "Aishmainya",20);

SELECT date_c, max(amount)
FROM expenses
WHERE amount > 1000
GROUP BY date_c
ORDER BY date_c ASC;

UPDATE user
SET user_name= "Vansh Pansari"
WHERE user_name = "Vansh";

SET SQL_SAFE_UPDATES = 0;

SELECT * FROM user;