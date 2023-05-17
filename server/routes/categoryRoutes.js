const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");

router.post("/", categoryController.createCategory);

router.delete("/", categoryController.deleteCategory);

module.exports = router;