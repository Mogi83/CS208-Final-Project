var express = require('express');
var router = express.Router();

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

router.get('/comments', function(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const query = 'SELECT * FROM testimonials ORDER BY created_at DESC LIMIT ? OFFSET ?';
    
    req.db.query(query, [limit, offset], function(err, results) {
        if (err) {
            console.error("DB Fetch Error:", err);
            return res.status(500).json({ error: "Could not load comments" });
        }
        res.json(results);
    });
});

router.post('/submit-comment', function(req, res) {
    const { name, rating, review } = req.body;

    if (!name || !name.trim() || !review || !review.trim()) {
        return res.status(400).json({ error: "You can't leave the name or review blank!" });
    }

    const query = 'INSERT INTO testimonials (name, rating, review, created_at) VALUES (?, ?, ?, ?)';
    const values = [name, rating, review, new Date()];

    req.db.query(query, values, function(err, result) {
        if (err) {
            console.error("DB Save Error:", err);
            return res.status(500).json({ error: "Database failed to save." });
        }
        res.status(200).json({ message: "Review added!" });
    });
});


router.get('/review-stats', function(req, res) {
    const query = `
        SELECT rating, COUNT(*) as count 
        FROM testimonials 
        GROUP BY rating`;

    req.db.query(query, function(err, results) {
        if (err) return res.status(500).json({ error: "Stats failed" });

        let stats = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 };
        
        results.forEach(row => {
            stats[row.rating] = row.count;
            stats.total += row.count;
        });

        res.json(stats);
    });
});

module.exports = router;