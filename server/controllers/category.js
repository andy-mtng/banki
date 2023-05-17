const Category = require("../models/category.js");

const createCategory = (req, res) => {
    const categoryData = req.body;
    console.log(categoryData);

    const newCategory = new Category({
        categoryName: categoryData.categoryName,
        clientAssignedId: categoryData.clientAssignedId,
        flashCards: categoryData.flashCards
    });

    newCategory.save()
        .then(savedCategory => { res.json({message: "Category saved to database"}) })
        .catch(err => { res.status(500).json({message: "Error: Category not saved to database. " + err})})
}

const deleteCategory = (req, res) => {
    // get delId
    // Find and delete that
}

module.exports = {
    createCategory: createCategory,
    deleteCategory: deleteCategory
}