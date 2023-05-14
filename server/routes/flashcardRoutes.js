const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Flashcard get");
});

router.post("/", (req, res) => {
    console.log("Post hit");
})

module.exports = router;