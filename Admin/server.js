const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const app = express();
const port = 8080; // Use the port you prefer

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up MySQL connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'rocketpower',
    database: 'consultancy_firm'
});
const promisePool = pool.promise();

// Set up multer for file uploads
const upload = multer({
    dest: 'uploads/', // Destination folder
    limits: { fileSize: 10000000 } // Limit file size to 10MB
});

// Utility function to delete files
const unlink = promisify(fs.unlink);

// ---------- Event Management Routes ----------

// Add a new event
app.post('/api/admin_event', upload.single('image'), async (req, res) => {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    try {
        await promisePool.query(
            'INSERT INTO events (title, description, image_path) VALUES (?, ?, ?)',
            [title, description, imagePath]
        );
        res.status(201).json({ message: 'Event added successfully.' });
    } catch (err) {
        console.error('Error adding event:', err);
        res.status(500).json({ error: 'Error adding event.' });
    }
});

// Update an existing event
app.put('/api/admin_event/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    try {
        let query = 'UPDATE events SET title = ?, description = ?';
        const params = [title, description];

        if (imagePath) {
            query += ', image_path = ?';
            params.push(imagePath);
        }

        query += ' WHERE id = ?';
        params.push(id);

        await promisePool.query(query, params);
        res.status(200).json({ message: 'Event updated successfully.' });
    } catch (err) {
        console.error('Error updating event:', err);
        res.status(500).json({ error: 'Error updating event.' });
    }
});

// Delete an event
app.delete('/api/admin_event/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await promisePool.query('SELECT image_path FROM events WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Event not found.' });
        }

        const imagePath = rows[0].image_path;
        if (imagePath) {
            await unlink(path.join(__dirname, 'uploads', imagePath));
        }

        await promisePool.query('DELETE FROM events WHERE id = ?', [id]);
        res.status(200).json({ message: 'Event deleted successfully.' });
    } catch (err) {
        console.error('Error deleting event:', err);
        res.status(500).json({ error: 'Error deleting event.' });
    }
});

// List all events
app.get('/api/admin_event', async (req, res) => {
    try {
        const [events] = await promisePool.query('SELECT * FROM events');
        res.json({ events });
    } catch (err) {
        console.error('Error listing events:', err);
        res.status(500).json({ error: 'Error listing events.' });
    }
});

// ---------- File Upload Management Routes ----------

// Handle file upload (Admin only)
app.post('/api/admin/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const metadata = {
        name: req.file.filename,
        title: req.body.title,
        description: req.body.description
    };

    try {
        await promisePool.query(
            'INSERT INTO file_metadata (name, title, description) VALUES (?, ?, ?)',
            [metadata.name, metadata.title, metadata.description]
        );
        res.status(200).send('File uploaded successfully.');
    } catch (err) {
        console.error('Error saving metadata:', err);
        res.status(500).send('Error saving metadata.');
    }
});

// List all files
app.get('/api/files', async (req, res) => {
    try {
        const [files] = await promisePool.query('SELECT * FROM file_metadata');
        res.json({ files });
    } catch (err) {
        console.error('Error reading files:', err);
        res.status(500).send('Error reading files.');
    }
});

// Handle file deletion (Admin only)
app.delete('/api/admin/delete', async (req, res) => {
    const fileName = req.query.file;
    if (!fileName) {
        return res.status(400).send('No file specified.');
    }

    try {
        await unlink(path.join(__dirname, 'uploads', fileName));
        await promisePool.query('DELETE FROM file_metadata WHERE name = ?', [fileName]);
        res.status(200).send('File deleted successfully.');
    } catch (err) {
        console.error('Error deleting file:', err);
        res.status(500).send('Error deleting file.');
    }
});

// ---------- Newsletter Management Routes ----------

// Add a new newsletter
app.post('/api/index', upload.single('image'), async (req, res) => {
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    try {
        await promisePool.query(
            'INSERT INTO newsletters (title, content, image_path) VALUES (?, ?, ?)',
            [title, content, imagePath]
        );
        res.status(200).send('Newsletter added successfully.');
    } catch (err) {
        console.error('Error adding newsletter:', err);
        res.status(500).send('Error adding newsletter.');
    }
});

// Update an existing newsletter
app.put('/api/index/:id', upload.single('image'), async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    try {
        const [rows] = await promisePool.query('SELECT image_path FROM newsletters WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Newsletter not found.');
        }

        const oldImagePath = rows[0].image_path;
        if (oldImagePath && imagePath) {
            await unlink(path.join(__dirname, 'uploads', oldImagePath));
        }

        await promisePool.query(
            'UPDATE newsletters SET title = ?, content = ?, image_path = ? WHERE id = ?',
            [title, content, imagePath, id]
        );
        res.status(200).send('Newsletter updated successfully.');
    } catch (err) {
        console.error('Error updating newsletter:', err);
        res.status(500).send('Error updating newsletter.');
    }
});

// Delete a newsletter
app.delete('/api/index/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [rows] = await promisePool.query('SELECT image_path FROM newsletters WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).send('Newsletter not found.');
        }

        const imagePath = rows[0].image_path;
        if (imagePath) {
            await unlink(path.join(__dirname, 'uploads', imagePath));
        }

        await promisePool.query('DELETE FROM newsletters WHERE id = ?', [id]);
        res.status(200).send('Newsletter deleted successfully.');
    } catch (err) {
        console.error('Error deleting newsletter:', err);
        res.status(500).send('Error deleting newsletter.');
    }
});

// List all newsletters
app.get('/api/index', async (req, res) => {
    try {
        const [newsletters] = await promisePool.query('SELECT * FROM newsletters');
        res.json({ newsletters });
    } catch (err) {
        console.error('Error listing newsletters:', err);
        res.status(500).send('Error listing newsletters.');
    }
});

// ---------- Serve Admin and User Pages ----------

// Serve Admin page
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Serve User page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
