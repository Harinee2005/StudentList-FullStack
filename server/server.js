const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(express.json());

const port = 5000;

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "students",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.stack);
        return;
    }
    console.log("Connected to database.");
});

app.post('/add_user', (req, res) => {
    const sql = "INSERT INTO student_details (`name`, `email`, `age`, `gender`) VALUES (?)";
    const values = [req.body.name, req.body.email, req.body.age, req.body.gender];

    db.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Error inserting data: " + err);
            return res.json({ message: 'Something unexpected occurred: ' + err });
        }
        return res.json({ success: "Student added successfully" });
    });
});

app.get("/students", (req, res) => {
    const sql = "SELECT * FROM student_details";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: "Server error" });
        return res.json(result);
    });
});

app.get("/get_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM student_details WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: "Server error" });
        return res.json(result.length > 0 ? result : []);
    });
});


app.delete("/delete_student/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM student_details WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ message: "Server error" });
        return res.json({ success: "Student deleted successfully" });
    });
});

app.put("/update_student/:id", (req, res) => {
    const id = req.params.id;
    const { name, email, age, gender } = req.body;
    const sql = "UPDATE student_details SET name=?, email=?, age=?, gender=? WHERE id=?";
    
    db.query(sql, [name, email, age, gender, id], (err, result) => {
        if (err) return res.json({ message: "Error updating student" });
        return res.json({ success: "Student updated successfully" });
    });
});


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
