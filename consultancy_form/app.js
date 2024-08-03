const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rocketpower',
    database: 'consultancy_firm'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL connected...');
});

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, '..', 'Menu')));
app.use(express.static(path.join(__dirname, '..', 'style')));
app.use(express.static(path.join(__dirname, '..', 'script')));
app.use(express.static(path.join(__dirname, '..', 'Resources')));

// Handle form submission
app.post('/submit_form', (req, res) => {
    const { name, email, location } = req.body;

    console.log('Received form data:', { name, email, location });

    const query = 'INSERT INTO registrations (full_name, email, location) VALUES (?, ?, ?)';
    db.query(query, [name, email, location], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else {
            res.send('Form submitted successfully!');
        }
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
