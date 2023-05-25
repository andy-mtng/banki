const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategoryModelSchema = new Schema({
    categoryName: String,
    clientAssignedId: String,
    user_id: {
        type: String,
        required: true
    },
    flashCards: [{
        type: mongoose.Schema.Types.ObjectId,
        // Name of the referenced collection
        ref: "FlashCard"
    }]
});

module.exports = mongoose.model("Category", CategoryModelSchema);