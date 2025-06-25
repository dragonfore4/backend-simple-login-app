const jwt = require('jsonwebtoken');
const logger = require('../config/logger');
const { log } = require('winston');


exports.login = async (req, res) => {
    if (!req.body) {
        logger.error('Login attempt with no body', { 
            ip: req.ip || req.connection.remoteAddress,
            userAgent: req.get('User-Agent')
        });
        return res.status(400).json({ error: 'Request body is required' });
    }
    const { username, password } = req.body;
    
    logger.info(`Login attempt for username: ${username}`, { 
        ip: req.ip || req.connection.remoteAddress,
        userAgent: req.get('User-Agent')
    });
    
    if (username === 'admin' && password === 'admin') {
        const token = jwt.sign({
            username: username
        }, "mysecretkey", {
            expiresIn: '1h'
        });
        
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            maxAge: 3600000 // 1 hour,
            
        });
        
        logger.info(`Successful login for username: ${username}`, { 
            ip: req.ip || req.connection.remoteAddress 
        });
        res.json({ message: 'Login successful' });
    } else {
        logger.warn(`Failed login attempt for username: ${username}`, { 
            ip: req.ip || req.connection.remoteAddress,
            reason: 'Invalid credentials'
        });
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

exports.hello = async (req, res) => {
    logger.debug('Hello endpoint accessed');
    res.send('Hello World!');
}