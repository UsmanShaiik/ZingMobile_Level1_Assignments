const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'CRUD' 
});

connection.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database');

  // Middleware to check role-based access
  const checkPermission = (req, res, next) => {
    const { role, collegeId, section, studentId } = req.query;

    switch (role) {
      case 'superAdmin':
        next();
        break;
      case 'admin':
        if (collegeId) {
          next();
        } else {
          res.status(403).json({ error: 'Admin permission denied. Provide collegeId.' });
        }
        break;
      case 'teacher':
        if (section) {
          next();
        } else {
          res.status(403).json({ error: 'Teacher permission denied. Provide section.' });
        }
        break;
      case 'student':
        if (studentId === req.params.id) {
          next();
        } else {
          res.status(403).json({ error: 'Student permission denied. Access only your data.' });
        }
        break;
      default:
        res.status(403).json({ error: 'Invalid role.' });
    }
  };

  // READ data
  app.get('/students/:id', checkPermission, (req, res) => {
    const { role } = req.query;
    const { id } = req.params;

    let query = 'SELECT * FROM students';

    switch (role) {
      case 'admin':
        query += ` WHERE collegeId = ${req.query.collegeId}`;
        break;
      case 'teacher':
        query += ` WHERE section = '${req.query.section}'`;
        break;
      case 'student':
        query += ` WHERE id = ${id}`;
        break;
      default:
        break;
    }

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching student data:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(results);
    });
  });

  // WRITE data
  app.post('/students', checkPermission, (req, res) => {
    const { role } = req.query;

    if (role === 'superAdmin') {
      const student = req.body;
      connection.query('INSERT INTO students SET ?', student, (err, result) => {
        if (err) {
          console.error('Error creating student:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.status(201).json({ message: 'Student created successfully.' });
      });
    } else {
      res.status(403).json({ error: 'Write permission denied. Only Super Admin can create students.' });
    }
  });

  // UPDATE data
  app.put('/students/:id', checkPermission, (req, res) => {
    const { role } = req.query;
    const { id } = req.params;

    if (role === 'student' && id !== req.query.studentId) {
      res.status(403).json({ error: 'Update permission denied. Access only your data.' });
      return;
    }

    const student = req.body;
    connection.query('UPDATE students SET ? WHERE id = ?', [student, id], (err, result) => {
      if (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json({ message: 'Student updated successfully.' });
    });
  });

  // DELETE data
  app.delete('/students/:id', checkPermission, (req, res) => {
    const { role } = req.query;
    const { id } = req.params;

    if (role === 'superAdmin' || (role === 'student' && id === req.query.studentId)) {
      connection.query('DELETE FROM students WHERE id = ?', id, (err, result) => {
        if (err) {
          console.error('Error deleting student:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
        res.json({ message: 'Student deleted successfully.' });
      });
    } else {
      res.status(403).json({ error: 'Delete permission denied.' });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
