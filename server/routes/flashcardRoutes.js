const express = require("express");
const router = express.Router();
const flashCardController = require("../controllers/flashcard.js");

router.use(express.json());

router.get("/", (req, res) => {
    res.json({message: "Hello"});
});

router.post("/", flashCardController.createFlashCard);

router.delete("/", flashCardController.deleteFlashCard);

router.put("/", flashCardController.updateFlashCard);

module.exports = router;