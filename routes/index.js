var express = require('express');
var router = express.Router();

/* GET Pages */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Downtown Donuts' });
});

router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Our Menu' });
});

router.get('/story', function(req, res, next) {
  res.render('story', { title: 'Our Story' });
});

router.get('/testimonials', function(req, res, next) {
  res.render('testimonials', { title: 'Community Comments' });
});

/* --- NEW: The "Kitchen" Logic --- */

// 1. GET Comments (Used by your loadComments() function in JS)
router.get('/comments', function(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const query = 'SELECT * FROM testimonials ORDER BY created_at DESC LIMIT ? OFFSET ?';
    
    // req.db is attached via the middleware in app.js
    req.db.query(query, [limit, offset], function(err, results) {
        if (err) {
            console.error("DB Fetch Error:", err);
            return res.status(500).json({ error: "Could not load comments" });
        }
        res.json(results); // Sends back regular data to the browser
    });
});

// 2. POST Comment (Used by your Submit button)
router.post('/submit-comment', function(req, res) {
    const data = req.body; // This is the JSON from your frontend

    // Server-side validation (No library needed, just an 'if' statement)
    if (!data.name || !data.rating || !data.review) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    const query = 'INSERT INTO testimonials (name, rating, review, created_at) VALUES (?, ?, ?, ?)';
    const values = [data.name, data.rating, data.review, new Date()];

    req.db.query(query, values, function(err, result) {
        if (err) {
            console.error("DB Save Error:", err);
            // Sending JSON instead of rendering 'error' prevents the frontend crash
            return res.status(500).json({ error: "Database failed to save review." });
        }
        res.status(200).json({ message: "Review added!" });
    });
});

module.exports = router;