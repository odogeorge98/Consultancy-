const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const cors = require('cors');  // Import the cors package

const app = express();
const port = 3000;

// Set up body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use CORS middleware
app.use(cors());

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


// Handle subscription form submission
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    console.log('Received subscription request:', { email });

    // Check if the email already exists
    const checkQuery = 'SELECT * FROM subscribers WHERE email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
        } else if (results.length > 0) {
            // If email exists, send a message saying the email is already subscribed
            res.status(400).send('This email is already subscribed.');
        } else {
            // Insert the email into the subscribers table
            const query = 'INSERT INTO subscribers (email) VALUES (?)';
            db.query(query, [email], (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server Error');
                } else {
                    res.send('Subscription successful!');
                }
            });
        }
    });
});
