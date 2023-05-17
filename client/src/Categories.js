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
        const updatedCategories = categories.filter((category) => {
            return category.clientAssignedId !== delId;
        })
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
                            id={category.clientAssignedId}
                            key={category.key} 
                            categoryName={category.categoryName}
                            deleteCategory={deleteCategory}/>
            })}
        </div>
    )
}

export default CategoriesContainer;