import { useState, useEffect } from "react";
import EditCategoriesForm from "./EditCategoriesForm.js";

function Category(props) {
    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [clientAssignedId, setClientAssignedId] = useState(props.clientAssignedId);
    const [editing, setEditing] = useState(false);

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
        props.editCategory({
            clientAssignedId: clientAssignedId,
            key: clientAssignedId,
            categoryName: updatedCategoryName,
            flashCards: props.flashCards
        });
    }

    return (
        <div>
            <h1>{categoryName}</h1>
            {editing && <EditCategoriesForm 
                currentCategoryName={categoryName} 
                getUpdatedCategoryName={getUpdatedCategoryName}/>}
            <button onClick={toggleEditingOn}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Category;