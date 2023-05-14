const express = require("express");
require("dotenv").config()

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});