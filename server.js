const express = require('express');
const { readdirSync } = require("fs")
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();

// Import logger and morgan middleware
const logger = require('./config/logger');
const morganMiddleware = require('./config/morganMiddleware');

const app = express();
const port = 8080

const corsOptions = {
    origin: ['http://localhost:3000', 'https://simple-login.sirasith.net'], // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}

app.use(cors(corsOptions));
app.use(morganMiddleware); // Add HTTP request logging
app.use(express.json());
app.use(cookieParser())


readdirSync("./Routes").forEach((e) => {
    app.use("/api", require(`./Routes/${e}`));
})

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`, { stack: err.stack });
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  logger.info(`Server started successfully on port ${port}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
  logger.info(`Log level: ${process.env.LOG_LEVEL || 'info'}`);
})
