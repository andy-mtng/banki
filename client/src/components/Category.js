import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditCategoriesForm from "./EditCategoriesForm.js";

function Category(props) {
    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [clientAssignedId, setClientAssignedId] = useState(props.clientAssignedId);
    const [editing, setEditing] = useState(false);
    const pathToFlashCards = "/categories/" + categoryName;

    const handleDelete = () => {
        props.deleteCategory(clientAssignedId);
        deleteCategory(clientAssignedId);
    }

    const deleteCategory = async (delId) => {
        fetch(`http://localhost:5000/category?id=${delId}`, {
            method: "DELETE"
        })
        .then((response) => response.json() )
        .then((data) => console.log(data) )
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    }

    const toggleEditingOn = () => {
        setEditing(true);
    }

    const getUpdatedCategoryName = (updatedCategoryName) => {
        setCategoryName(updatedCategoryName);
        setEditing(false);
        const updatedCategory = {
            clientAssignedId: clientAssignedId,
            key: clientAssignedId,
            categoryName: updatedCategoryName,
            flashCards: props.flashCards
        }
        props.editCategory(updatedCategory);
        editCategory(updatedCategory);
    }

    const editCategory = (updatedCategoryObj) => {
        fetch("http://localhost:5000/category", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCategoryObj)
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(error => {
            console.log("There was a problem with the request:", error);
        })
    }

    return (
        <div>
            <Link to={pathToFlashCards}>{categoryName}</Link>
            {editing && <EditCategoriesForm 
                currentCategoryName={categoryName} 
                getUpdatedCategoryName={getUpdatedCategoryName}/>}
            <button onClick={toggleEditingOn}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Category;