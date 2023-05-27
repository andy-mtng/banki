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
        <div className="absolute top-0 left-0 text-lg font-medium w-full h-full">
            <form onSubmit={handleSubmit} className="flex">
                <input className="flex-grow" type="text" value={editedCategory} onChange={handleInputChangeEditedCategory} />
                <button type="submit" className="px-2 text-base text-center bg-gray-300">Save</button>
            </form>
        </div>
    );
}

export default EditCategoriesForm;