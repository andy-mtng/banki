const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FlashCardModelSchema = new Schema({
    front: String,
    back: String,
    clientAssignedId: String
});

module.exports = mongoose.model("FlashCard", FlashCardModelSchema);
