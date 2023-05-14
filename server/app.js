const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const flashCardRouter = require("./routes/flashcardRoutes.js");
const homeRoutes = require("./routes/homeRoutes.js");

const app = express();
const port = 5000;

mongoose.set("strictQuery", false);
app.use("/flashcard", flashCardRouter);
app.use("/", homeRoutes);

// Connect to MongoDB
main().catch((err) => console.log(err));
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});