const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/login', (req ,res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
