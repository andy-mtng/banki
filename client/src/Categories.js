import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import Category from "./components/Category.js";
import AddCategoriesForm from "./components/AddCategoriesForm.js";

function CategoriesContainer() {
    const [categories, setCategories] = useState([]);

    const addCategory = (newCategory) => {
        setCategories([...categories, newCategory]);
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
                return <Category key={category.key} categoryName={category.categoryName}/>
            })}
        </div>
    )
}

export default CategoriesContainer;