import express from "express";
import mysql from "mysql2"; // Get the client
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt"; // To hash passwords
import jwt from "jsonwebtoken"; // For JWT authentication

dotenv.config();  // To read from env file
const app = express();
 
//Middelwares  
app.use(cors());
app.use(express.json()); // To parse data in application/json form


// Create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_PASSWORD,
    password: process.env.DB_NAME,
    dateStrings: true
});


//GET request to check if the server is working or not
app.get("/", (request, response) => {
    response.send("Hello ji , i am listening to you");
});


// Middleare the authenticate the user i.e. to check if correct user is sending the request or not
// We'll have to add this middleware in every route where we want to authenticate the user (At present kahin add ni kiya hai)
const authenticateToken = (request, response, next) => {
    console.log("Authenticate Token was called");

    const authHeader = request.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    // Token check
    // console.log(token);

    // Token existence check
    if (token == undefined) {
        return response.status(500).json("Token missing in the header");
    }

    // Token authenticity check
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log(decoded);

        // This line can be removed if not needed , this is just to put the decoded data as a variable in the request section
        request.user = decoded;
        next();
    } catch (error) {
        response.status(500).send(error);
    }
}

// http://localhost:8080/user/:id/pieChart

// Route to get the pie chart
app.get("/user/:id/pieChart", authenticateToken, (request, response) => {
    let id = request.params.id;
    let query = `
        SELECT category AS id , SUM(Amount) AS value
        FROM expenses
        WHERE User_id = ?
        GROUP BY category
    `;

    try {
        connection.query(query, id, (err, result) => {
            if (err) throw err;

            // Hard-coding pie-chart colours
            let colours = [
                ["Food", "hsl(37, 70%, 50%)"],
                ["Transport", "hsl(100, 70%, 50%)"],
                ["Books", "hsl(73, 70%, 50%)"],
                ["Rent", "hsl(345, 70%, 50%)"],
                ["Utilities", "hsl(293, 70%, 50%)"],
                ["Entertainment", "hsl(210, 70%, 50%)"],
                ["Health", "hsl(160, 70%, 50%)"],
                ["Misc", "hsl(260, 70%, 50%)"],
            ]

            result.forEach((object) => {
                object["label"] = object.id;
                for (const [key, value] of colours) {
                    if (key === object.label) object["color"] = value;
                }
                console.log(object);
            });

            response.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
    }

});

// ------------------------------------------------------
// To help the user login in her account
app.post("/login", (request, response, next) => {
    const { username, email, password } = request.body;
    console.log(request.body);

    let query = `
        SELECT * FROM users
        WHERE
        username = ? AND 
        email = ?
    `;

    try {
        connection.query(query, [username, email], async (err, result) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ success: false, message: "Database error" });
            };

            console.log(result);

            if (result[0].password) {
                const match = await bcrypt.compare(password, result[0].password);
                console.log(match);
                console.log("Inside result wala if");

                if (match) {
                    console.log("Inside match wala if");

                    // To send the JWT token to the user after she has got her credentials verified.
                    const user = {
                        usernameObject: username,
                        emailobject: email,
                    }

                    const accesstoken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);

                    response.status(200).json({ success: true, message: "Login successful", accesstoken: accesstoken, User_id: result[0].User_id });

                } else {
                    response.status(200).json({ success: false, message: "Invalid password" });
                }
            } else {
                return response.status(401).json({ success: false, message: "Invalid username or email" });
            }
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        next(error);
    }


});


// ------------------------------------------------------
// Below GIVEN routes are for the EXPENSES TABLE

//GET request to fetch all the data from the database
// To be removed later
app.get("/expenses", (request, response) => {
    let query = `SELECT * FROM expenses`;

    try {
        connection.query(query, (err, result) => {
            if (err) throw err;
            response.send(result);
        });
    } catch (error) {
        console.log(error);
    }

});


// GET request to get all the data of a user from the database
app.get("/user/:id/expenses", authenticateToken, (request, response) => {
    let User_id = request.params.id;
    console.log(request.params);

    let query = `
        SELECT * FROM expenses
        WHERE User_id = ?
    `
    try {
        connection.query(query , User_id , (err , result)=>{
            if(err) throw err;
            // console.log(result);
            response.status(200).json(result);
        });
    } catch (error) {
        console.log(error);
        response.status(500).json({message : "Expenses not fetched from database"});
    }
});


// POST request to insert the data into the database
app.post("/user/:id/expenses", authenticateToken, (request, response) => {
    let { Amount, Category, Date_of_expense, Note } = request.body;
    let User_id = request.params.id;
    
    console.log(request.body);
    console.log(request.params);

    let query = `
        INSERT INTO expenses 
        (Amount,  Category , Date_of_expense, Note , User_id) 
        VALUES 
        (?, ?, ?, ?, ?)`

    try {
        connection.query(query,
            [Amount, Category, Date_of_expense, Note, User_id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                response.status(200).json({message : "Expense added successfully in database"});
            });
    } catch (error) {
        console.log(error);
        response.status(500).json({message : "Expense not added in database"});
    }
});


//PUT request to update the data in our database
app.put("/user/:id/expenses/:exp_id", authenticateToken, (request, response) => {
    const { Amount, Category, Date_of_expense, Note } = request.body;
    const { id , exp_id } = request.params;

    console.log(request.body);
    console.log(request.params);

    let query = `
        UPDATE expenses 
        SET
            Amount = ?,  
            Category = ?,
            Date_of_expense = ?,
            Note = ?
        WHERE
            Expense_id = ?
        AND
            User_id = ?
        LIMIT 1;
        `

    try {
        connection.query(
            query,
            [Amount, Category, Date_of_expense, Note, exp_id, id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                response.status(200).json({message : "Expense updated in database"});
            });
    } catch (error) {
        console.log(error);
        response.status(500).json({message : "Expense not updated in database"});
    }
});


//DELETE request to delete the data from our database
app.delete("/user/:id/expenses/:exp_id", authenticateToken, (request, response) => {
    const { id , exp_id } = request.params;
    
    let query = `
        DELETE FROM expenses
        WHERE
            Expense_id = ?
        AND 
            User_id = ?
        LIMIT 1
        `
    
        try {
        connection.query(
            query,
            [exp_id, id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                response.status(200).json({ message: "Expense Item deleted successfully" });
            });
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: "Expense Item not deleted " });
    }
});


// ------------------------------------------------------
// Below GIVEN routes are for the USER TABLE

//GET request to get all details of all the users existing in the database
// To be removed later
app.get("/user", (request, response) => {
    const query = `SELECT * FROM users`;

    try {
        connection.query(query, (err, result) => {
            if (err) throw err;
            response.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});


//GET request to get all the details of an existing user
app.get("/user/:id", authenticateToken, (request, response) => {
    const User_id = request.params.id;

    const query = `
        SELECT * FROM users
        WHERE
            User_id = ?
        `;

    try {
        connection.query(query, User_id, (err, result) => {
            if (err) throw err;
            response.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});

//POST request to add a new user in the database
app.post("/user", authenticateToken, async (request, response) => {
    const { username, gender, email, password, phone_no, country } = request.body;
    console.log(request.body);

    // To store hashed password of the user
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let query = `
        INSERT INTO users 
        (username, gender, email, password , phone_no, country) 
        VALUES 
        (?, ?, ?, ?, ?, ?)`;
    try {
        connection.query(query,
            [username, gender, email, hashedPassword, phone_no, country],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                response.status(200).json({ success: true, message: "User added successfully in database" });
            });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "User not added in database" });
    }
});


// PUT request to edit the details of the existing user
// (We have not given the option to change email and password)
app.put("/user/:id", authenticateToken, (request, response) => {
    const { username, gender, phone_no, country } = request.body;
    const User_id = request.params.id;
    console.log(request.body);
    let query = `
        UPDATE users 
        SET
            username = ?,  
            gender = ?,
            phone_no = ?,
            country = ?
        WHERE
            User_id = ?
        LIMIT 1;
        `
    try {
        connection.query(
            query,
            [username, gender, phone_no, country, User_id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                response.status(200).json("User updates successfully in database");
            });
    } catch (error) {
        console.log(error);
        response.status(200).json("User not updated in database");
    }
});


//DELETE request to delete an existing user
app.delete("/user/:id", authenticateToken, (request, response) => {
    const User_id = request.params.id;
    let query = `
        DELETE FROM users
        WHERE
            User_id = ?
        LIMIT 1
        `
    try {
        connection.query(
            query,
            User_id,
            (err, result) => {
                if (err) throw err;
                console.log(result);
            });
    } catch (error) {
        console.log(error);
    }
});



// ------------------------------------------------------
// Below GIVEN routes are for the GOALS TABLE

//GET request to get all the goals from the database
// To be removed later
app.get("/goals", (request, response) => {
    const query = `SELECT * FROM goals`;

    try {
        connection.query(query, (err, result) => {
            if (err) throw err;
            response.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});


//GET request to get all the goals of a user from the database
app.get("/user/:id/goal", authenticateToken, (request, response) => {
    const User_id = request.params.id;

    const query = `SELECT * FROM goals WHERE User_id = ?`;

    try {
        connection.query(query, User_id, (err, result) => {
            if (err) throw err;
            response.send(result);
        });
    } catch (error) {
        console.log(error);
    }
});


//POST request to add goals for a user in the database
app.post("/user/:id/goal", authenticateToken, (request, response) => {
    let { Title, Amount, Saved, Target_date } = request.body;
    let User_id = request.params.id;
    console.log(request.body);
    console.log(request.params);

    let query = `
        INSERT INTO goals 
        ( Title , Amount,  Saved , Target_date, User_id ) 
        VALUES 
        (?, ?, ?, ?, ?)`;

    try {
        connection.query(query,
            [Title, Amount, Saved, Target_date, User_id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
            });
    } catch (error) {
        console.log(error);
    }
});


//PUT request to edit a goal for a user in the database
app.put("/user/:id/goal", authenticateToken, (request, response) => {
    let { Title, Amount, Saved, Target_date, Goal_id } = request.body;
    console.log(request.body);

    let query = `
        UPDATE goals 
        SET
            Title = ?,
            Amount = ?,  
            Saved = ?,
            Target_date = ?
        WHERE
            Goal_id = ?
        LIMIT 1;
        `
    try {
        connection.query(
            query,
            [Title, Amount, Saved, Target_date, Goal_id],
            (err, result) => {
                if (err) throw err;
                console.log(result);
                response.status(200).json({ message: "Goal edited successfully" });
            });
    } catch (error) {
        console.log(error);
    }
});


//DELETE request to delete goal of an existing user in the database
app.delete("/user/:id/goal", authenticateToken, (request, response) => {
    let { g_id } = request.params;
    console.log(request.params);
    let query = `
        DELETE FROM goals
        WHERE
            Goal_id = ?
        LIMIT 1
        `
    try {
        connection.query(
            query,
            g_id,
            (err, result) => {
                if (err) throw err;
                console.log(result);
            });
    } catch (error) {
        console.log(error);
    }
});

// Error handling middleware
app.use((error, request, response, next) => {
    console.error("Unhandled error:", error);
    response.status(500).json({ success: false, message: "Internal server error" });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`);
});

export default app;



/*

Just to check , of no use

app.get("/expenses", (request, response)=>{

    try {
        connection.query("SHOW TABLES", (err, result, fields)=>{
            if(err) throw err;
            console.log(result);
            console.log(fields);
        });
    }catch(error){
        console.log(error);
    }

});
*/
