import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import Category from "./components/Category.js";
import AddCategoriesForm from "./components/AddCategoriesForm.js";

function CategoriesContainer() {
    const [categories, setCategories] = useState([]);

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
    }

    const deleteCategory = (delId) => {
        console.log(delId);
        const updatedCategories = categories.filter((category) => {
            return category.clientAssignedId !== delId;
        })
        setCategories(updatedCategories);
    }

    const editCategory = (editedCategory) => {
        const updatedCategories = categories.map((category) => {
            if (category.clientAssignedId === editedCategory.clientAssignedId) {
                return editedCategory;
            } else {
                return category;
            }
        });
        setCategories(updatedCategories);
    }

    useEffect(() => {
        console.log(categories);
    }, [categories]);

    return (
        <div>
            <Navbar />
            <h1>Categories Page</h1>
            <AddCategoriesForm addCategory={addCategory}/>
            {categories.map((category) => {
                return <Category 
                            clientAssignedId={category.clientAssignedId}
                            key={category.key} 
                            flashCards={category.flashCards}
                            categoryName={category.categoryName}
                            deleteCategory={deleteCategory}
                            editCategory={editCategory}/>
            })}
        </div>
    )
}

export default CategoriesContainer;