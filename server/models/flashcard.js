const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlashCardModelSchema = new Schema({
    front: String,
    back: String
});

const FlashCard = mongoose.model("FlashCard", FlashCardModelSchema);