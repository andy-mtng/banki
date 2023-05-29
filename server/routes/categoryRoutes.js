const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.js");
const { body } = require("express-validator");

const requireAuth = require("../middleware/requireAuth.js");

router.use(requireAuth);

router.get("/:category", categoryController.getFlashCardsFromCategory);

router.get("/", categoryController.getCategories);

router.post(
    "/", 
    body("categoryName")
        .notEmpty()
        .withMessage("Category cannot be empty")
        .isLength({ max:32 })
        .withMessage("Category cannot be longer than 32 characters."),
    categoryController.createCategory
);

router.delete("/", categoryController.deleteCategory);

router.put("/", 
    body("categoryName")
        .notEmpty()
        .withMessage("Category cannot be empty")
        .isLength({ max:32 })
        .withMessage("Category cannot be longer than 32 characters."),
    categoryController.updateCategory
);

module.exports = router;