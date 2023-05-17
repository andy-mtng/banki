const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoryModelSchema = new Schema({
    categoryName: String,
    clientAssignedId: Number,
    flashCards: [{
        type: mongoose.Schema.Types.ObjectId,
        // Name of the referenced collection
        ref: "flashcards"
    }]
});

module.exports = mongoose.model("Category", CategoryModelSchema);