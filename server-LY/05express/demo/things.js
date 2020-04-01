var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.send('Get route on things.');
});

router.post('/', (req, res) => {
	res.send('Post route on things.');
});

module.exports = router;