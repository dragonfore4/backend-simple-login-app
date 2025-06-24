const express = require('express');
const router = express.Router();
const { login, hello } = require('../Controllers/auth.js');

router.post('/login', login );
router.get('/hello', hello );

module.exports = router;