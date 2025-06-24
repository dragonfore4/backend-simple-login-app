const express = require('express');
const { readdirSync } = require("fs")
const cookieParser = require('cookie-parser');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = 8080

const corsOptions = {
    origin: ['http://localhost:3000', 'https://simple-login.sirasith.net'], // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())


readdirSync("./Routes").forEach((e) => {
    app.use("/api", require(`./Routes/${e}`));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
