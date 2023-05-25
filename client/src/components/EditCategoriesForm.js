import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
 
function EditCategoriesForm(props) {
    const [editedCategory, setEditedCategory] = useState(props.currentCategoryName);
    const { user } = useAuthContext();

    const handleInputChangeEditedCategory = (event) => {
        setEditedCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!user) {
            return;
        }

        console.log("editedCategory", editedCategory);
        props.getUpdatedCategoryName(editedCategory);
        setEditedCategory("");
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={editedCategory} onChange={handleInputChangeEditedCategory} />
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditCategoriesForm;