const express = require("express");
const router = express.Router();
const FlashCard = require("../models/flashcard.js");

router.use(express.json());

router.get("/", (req, res) => {
    res.json({message: "Hello"});
});

router.post("/", (req, res) => {
    const flashCardData = req.body;    
    const newFlashCard = new FlashCard({
        front: flashCardData.front, 
        back: flashCardData.back,
        clientAssignedId: flashCardData.id
    });
    newFlashCard.save()
        .then(savedFlashCard => { res.json({message : "Flashcard saved to database."}) })
        .catch(err => { res.status(500).json({message: "Error: Flashcard not saved to database. " + err}) });
});

router.delete("/", (req, res) => {
    const delId = req.query.id;
    FlashCard.deleteOne({ clientAssignedId: delId })
        .then(queryResult => { res.json({message : "Flashcard deleted from database."}) })
        .catch(err => { res.status(500).json({message: "Error: Flashcard not deleted from database. " + err}) });
});

router.put("/", (req, res) => {

});

module.exports = router;