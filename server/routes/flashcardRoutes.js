const express = require("express");
const router = express.Router();
const flashCardController = require("../controllers/flashcard.js");
const requireAuth = require("../middleware/requireAuth.js");

router.use(requireAuth);

router.post("/", flashCardController.createFlashCard);

router.delete("/", flashCardController.deleteFlashCard);

router.put("/", flashCardController.updateFlashCard);

module.exports = router;