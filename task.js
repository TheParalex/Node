// Import required modules
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');


// Create an Express app
const app = express();
const port = 3000;

// Use middleware
app.use(cors()); // Enable Cross-Origin Request Sharing (CORS)
app.use(bodyParser.json()); // Parse incoming JSON requests

// MySQL Database connection
const db = mysql.createConnection({
  host: 'localhost', // Database host
  user: 'root',      // Database username
  password: '',      // Database password
  database: 'my_database' // Database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// CRUD Operations:

// Create a new record
app.post('/add', (req, res) => {
  const { name, email } = req.body;
  const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
  
  db.query(query, [name, email], (err, result) => {
    if (err) {
      res.status(500).send('Error adding record');
      return;
    }
    res.status(201).send(`Record added with ID: ${result.insertId}`);
  });
});

// Get all records
app.get('/records', (req, res) => {
  const query = 'SELECT * FROM users';
  
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send('Error fetching records');
      return;
    }
    res.status(200).json(results);
  });
});

// Get a specific record by ID
app.get('/record/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE id = ?';
  
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send('Error fetching record');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Record not found');
      return;
    }
    res.status(200).json(results[0]);
  });
});

// Update a record by ID
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  
  db.query(query, [name, email, id], (err, result) => {
    if (err) {
      res.status(500).send('Error updating record');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Record not found');
      return;
    }
    res.status(200).send('Record updated successfully');
  });
});

// Delete a record by ID
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  
  db.query(query, [id], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting record');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Record not found');
      return;
    }
    res.status(200).send('Record deleted successfully');
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
