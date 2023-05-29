import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditCategoriesForm from "./EditCategoriesForm.js";
import { useAuthContext } from "../hooks/useAuthContext.js";
import EditIcon from "../assets/edit-icon.svg";
import DeleteIcon from "../assets/delete-icon.svg";

function Category(props) {
    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [clientAssignedId, setClientAssignedId] = useState(props.clientAssignedId);
    const [editing, setEditing] = useState(false);
    const pathToFlashCards = "/categories/" + categoryName;
    const { user } = useAuthContext();

    const handleDelete = () => {
        props.deleteCategory(clientAssignedId);
        deleteCategory(clientAssignedId);
    }

    const deleteCategory = async (delId) => {
        fetch(`http://localhost:5000/category?id=${delId}`, {
            method: "DELETE", 
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
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
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
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
        <div className="flex justify-between relative hover:bg-gray-200">
            <Link className="text-lg font-base" to={pathToFlashCards}>{categoryName}</Link>
            {editing ? (
                <div>
                    {editing && <EditCategoriesForm
                        currentCategoryName={categoryName}
                        getUpdatedCategoryName={getUpdatedCategoryName}/>}
                </div>
            ) : (
                <div className="flex gap-2">
                    <button onClick={toggleEditingOn}>
                        <img src={EditIcon} className="w-6 h-6" />
                    </button>
                    <button onClick={handleDelete}>
                        <img src={DeleteIcon} className="w-6 h-6" />
                    </button>
                </div>
            )}
        </div>
    )
}

export default Category;