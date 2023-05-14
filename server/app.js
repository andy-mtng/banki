const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config()
const flashCardRouter = require("./routes/flashcardRoutes.js");
// const homeRouter = require("./routes/homeRoutes.js");

const app = express();
const port = 5000;

mongoose.set("strictQuery", false);

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use("/flashcard", flashCardRouter);
// app.use("/", homeRouter);

app.get("/", (req, res) => {
    res.send("Home");
});

// Connect to MongoDB
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'flashcarddb' });
}

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});