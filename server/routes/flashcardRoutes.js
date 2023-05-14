const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
    res.json({welcome: "Hello"});
});

router.post("/", (req, res) => {
    console.log("Post hit");
    const flashCardData = req.body;
    console.log("Requested Data:", flashCardData);
    res.json("Flashcard created successfully");
})

module.exports = router;