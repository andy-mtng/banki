import { useState } from "react";

function EditCategoriesForm(props) {
    const [editedCategory, setEditedCategory] = useState(props.currentCategoryName);

    const handleInputChangeEditedCategory = (event) => {
        setEditedCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
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