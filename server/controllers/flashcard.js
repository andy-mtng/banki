const { get } = require("mongoose");
// const flashcard = require("../models/flashcard.js");
const FlashCard = require("../models/flashcard.js");
const Category = require("../models/category.js");

const getFlashCards = (req, res) => {
    FlashCard.find({})
        .then(flashCardsArray => { res.json({ flashCards: flashCardsArray }) })
        .catch(err => { res.status(500).json({message: "Error: Unable to retrieve flashcards from database. " + err}) })
}

const createFlashCard = (req, res) => {
    console.log("CATEGORY", req.query.category);
    const category = req.query.category;
    const flashCardData = req.body;    
    const newFlashCard = new FlashCard({
        front: flashCardData.front, 
        back: flashCardData.back,
        clientAssignedId: flashCardData.id
    });
    newFlashCard.save()
        .then(savedFlashCard => { 
            console.log(savedFlashCard);
            res.json({message : "Flashcard saved to database."});
            Category.updateOne(
                {categoryName: category}, 
                { $push: { flashCards: savedFlashCard._id } }
            )
            .then(result => console.log("Flashcard saved to category."))
            .catch(error => console.log("Error: Flashcard not saved to category"))
        })
        .catch(err => { res.status(500).json({message: "Error: Flashcard not saved to database. " + err}) });
}

const deleteFlashCard = (req, res) => {
    const delId = req.query.id;
    FlashCard.deleteOne({ clientAssignedId: delId })
        .then(queryResult => { res.json({message : "Flashcard deleted from database."}) })
        .catch(err => { res.status(500).json({message: "Error: Flashcard not deleted from database. " + err}) });
}

const updateFlashCard = (req, res) => {
    const updatedFlashCard = req.body;
    FlashCard.updateOne({ clientAssignedId: updatedFlashCard.id }, updatedFlashCard)
        .then(result => { res.json({message : "Flashcard updated in database."}) })
        .catch(err => { res.status(500).json({message: "Error: Flashcard not updated in database. " + err}) })
}

module.exports = {
    getFlashCards: getFlashCards,
    createFlashCard: createFlashCard,
    deleteFlashCard: deleteFlashCard,
    updateFlashCard: updateFlashCard
}