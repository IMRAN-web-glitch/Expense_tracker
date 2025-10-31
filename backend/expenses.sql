CREATE DATABASE vibe_coders;
USE vibe_coders;
--  DROP TABLE users;
DROP TABLE expenses;
 -- DROP TABLE goals;
DROP DATABASE vibe_coders;

CREATE TABLE users(
    User_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    phone_no VARCHAR(30) UNIQUE NOT NULL CHECK (phone_no REGEXP '^[0-9]{10}$'),
    country VARCHAR(50) NOT NULL
);

CREATE TABLE expenses(
    Expense_id INT AUTO_INCREMENT PRIMARY KEY,
    Amount BIGINT NOT NULL CHECK(Amount > 0),
    Category VARCHAR(100) NOT NULL,
    Date_of_expense DATE DEFAULT (CURRENT_DATE()),
    User_id INT NOT NULL,
    FOREIGN KEY (User_id) REFERENCES users(User_id) ON DELETE CASCADE,
    Note VARCHAR(255)
);

CREATE TABLE goals(
	Goal_Id INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Amount BIGINT NOT NULL 
		CONSTRAINT Amount_positive CHECK(Amount > 0),
    Saved BIGINT NOT NULL,
		CHECK(Saved >= 0 AND Saved <= Amount),
	Target_date DATE NOT NULL,
    User_id INT NOT NULL,
    FOREIGN KEY (User_id) REFERENCES users(User_id) ON DELETE CASCADE
);

INSERT INTO users
(User_id, username , gender , email , password, phone_no, country)
VALUES
(1, "a", "male", "a@gmail.com", "a@pass123" , "9811234512", "India"),
(2, "b", "male", "b@gmail.com", "b@pass123" , "9811244512", "Australia"),
(3, "c", "female", "c@gmail.com", "c@pass123" ,"9843234512", "Japan"),
(4, "d", "female", "d@gmail.com", "d@pass123" ,"9856234512", "Indonasia"),
(5, "e", "male", "e@gmail.com", "e@pass123" ,"9811243512", "India");


INSERT INTO expenses 
(Expense_id, Amount,  Category, Date_of_expense, User_id, Note) 
VALUES
(1, 20000, "food", "2023-10-01", 1, "Went on a dinner with family"),
(2, 20400, "transport", "2023-10-02", 1, "Paid internet and water bills"),
(3, 30020, "food", "2023-10-03", 1, "Ordered food for office lunch"),
(4, 100300, "transport", "2023-10-04", 1, "Bought cooker and kitchen items"),
(5, 3000, "Entertainment", "2023-10-05", 1, "Went to movies with friends"),
(6, 2800, "Health", "2023-10-08", 1, "Weekly grocery shopping"),
(7, 9500, "transport", "2023-10-10", 1, "Paid electricity bill"),
(8, 1800, "food", "2023-10-12", 1, "Dinner at restaurant"),
(9, 2500, "Entertainment", "2023-10-18", 1, "Renewed Netflix subscription"),
(10, 3100, "Health", "2023-10-22", 1, "Bought fruits and vegetables");


INSERT INTO goals
(Goal_Id , Title ,  Amount, Saved, Target_date, User_id )
VALUES
(1, "Buy a football" , 30000, 2000, "2026-10-01", 1),
(2, "Buy a gaming laptop" ,40000, 3000, "2026-10-01", 2),
(3, "Buy a mobile phone" ,20000, 4000, "2026-10-03", 3),
(4, "Buy a t-shirt" ,10000, 5000, "2026-10-05", 4),
(5, "Buy a television" ,60000, 6000, "2027-10-010", 5);

SELECT * FROM users;