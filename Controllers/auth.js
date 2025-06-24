const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
    const { username, password } = req.body;
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
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
}

exports.hello = async (req, res) => {
    res.send('Hello World!');
}