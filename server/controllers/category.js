const Category = require("../models/category.js");
const FlashCard = require("../models/flashcard.js");
const { validationResult } = require("express-validator");

const getFlashCardsFromCategory = (req, res) => {
    const categoryName = req.params.category;
    Category.findOne({ categoryName: categoryName })
        .populate("flashCards")
        .exec()
        .then((category) => {
            res.json( {flashCards: category.flashCards} );
        })
        .catch((err) => {
            res.status(500).json({message: "Error: Unable to retrieve categories from database. " + err})
        });
}

const getCategories = (req, res) => {
    const userId = req.user._id;
    Category.find({ user_id: userId })
        .then((categoriesArray) => { res.json({categoriesArray: categoriesArray}) })
        .catch(err => { res.status(500).json({message: "Error: Unable to retrieve categories from database. " + err}) })
}

const createCategory = (req, res) => {
    // Server-side validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
 
    const categoryData = req.body;
    const userId = req.user._id;

    const newCategory = new Category({
        categoryName: categoryData.categoryName,
        clientAssignedId: categoryData.clientAssignedId,
        user_id: userId,
        flashCards: categoryData.flashCards
    });

    newCategory.save()
        .then(savedCategory => { res.json({message: "Category saved to database"}) })
        .catch(err => { res.status(500).json({message: "Error: Category not saved to database. " + err})})
}

const updateCategory = (req, res) => {
    // Server-side validation
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updatedCategoryData = req.body;
    Category.updateOne({ clientAssignedId: req.body.clientAssignedId }, updatedCategoryData)
        .then((result) => { res.json({message: "Category updated in the database."}) })
        .catch((err) => { res.status(500).json({message: "Error: Category not updated in database. " + err}) });
}

const deleteCategory = (req, res) => {
    const delId = req.query.id;
    Category.deleteOne( {clientAssignedId: delId} )
        .then(queryResult => { res.json({message : "Category deleted from database."}) })
        .catch(err => { res.status(500).json({message: "Error: Category not deleted from database. " + err}) });
}

module.exports = {
    getFlashCardsFromCategory: getFlashCardsFromCategory,
    getCategories: getCategories,
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}