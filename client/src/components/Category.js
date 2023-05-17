import { useState, useEffect } from "react";
import EditCategoriesForm from "./EditCategoriesForm.js";

function Category(props) {
    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [clientAssignedId, setClientAssignedId] = useState(props.clientAssignedId);
    const [editing, setEditing] = useState(false);

    const handleDelete = () => {
        props.deleteCategory(clientAssignedId);
    }

    const toggleEditingOn = () => {
        setEditing(true);
    }

    const getUpdatedCategoryName = (updatedCategoryName) => {
        // setCategoryName(updatedCategoryName);
        // setEditing(false);
        // props.editCategory({

        // })
    }

    return (
        <div>
            <h1>{categoryName}</h1>
            {editing && <EditCategoriesForm currentCategoryName={categoryName} getUpdatedCategoryName={getUpdatedCategoryName}/>}
            <button onClick={toggleEditingOn}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Category;