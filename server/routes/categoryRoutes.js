const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");

const requireAuth = require("../middleware/requireAuth.js");

router.use(requireAuth);

router.get("/:category", categoryController.getFlashCardsFromCategory);

router.get("/", categoryController.getCategories);

router.post("/", categoryController.createCategory);

router.delete("/", categoryController.deleteCategory);

router.put("/", categoryController.updateCategory);

module.exports = router;