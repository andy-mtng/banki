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

const updateCategory = (req, res) => {
    const updatedCategoryData = req.body;
    console.log(updatedCategoryData);

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
    createCategory: createCategory,
    updateCategory: updateCategory,
    deleteCategory: deleteCategory
}