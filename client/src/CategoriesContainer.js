import { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import Category from "./components/Category.js";
import AddCategoriesForm from "./components/AddCategoriesForm.js";
import { useAuthContext } from "./hooks/useAuthContext.js";

function CategoriesContainer() {
    const [categories, setCategories] = useState([]);
    const { user } = useAuthContext();

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

    const getCategories = async () => {
        fetch("http://localhost:5000/category", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then((response) => { return response.json() })
        .then((categoryData) => { 
            const processedCategories = [];
            
            categoryData.categoriesArray.map((category) => {
                processedCategories.push({
                    clientAssignedId: category.clientAssignedId,
                    key: category.clientAssignedId,
                    categoryName: category.categoryName,
                    flashCards: category.flashCards
                });
            setCategories(processedCategories);
            });
        })
        .catch(error => {
            console.error("There was a problem with the request:", error);
        });
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="bg-gray-100 h-screen w-screen">
            <Navbar />
            <div className="flex justify-center mt-9">
                <div className="flex flex-col items-center w-96">
                    <AddCategoriesForm addCategory={addCategory}/>
                    <div className="flex flex-col w-full gap-2 mt-4">
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
                </div>
            </div>
        </div>
    )
}

export default CategoriesContainer;