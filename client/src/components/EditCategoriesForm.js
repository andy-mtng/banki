import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
 
function EditCategoriesForm(props) {
    const [editedCategory, setEditedCategory] = useState(props.currentCategoryName);
    const { user } = useAuthContext();
    const [errors, setErrors] = useState([]);

    const handleInputChangeEditedCategory = (event) => {
        setEditedCategory(event.target.value);
    }

    const validate = () => {
        const validationErrors = []

        if (editedCategory === "") {
            validationErrors.push("Category cannot be empty.")
        }

        if (editedCategory.length > 32) {
            validationErrors.push("Category cannot be longer than 32 characters.")
        }
        return validationErrors;
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            return;
        }

        if (!user) {
            return;
        }
        props.getUpdatedCategoryName(editedCategory);
        setEditedCategory("");
    }

    return (
        <div className="absolute top-0 left-0 text-lg font-medium w-full h-full">
            <form onSubmit={handleSubmit} className="flex">
                <input className="flex-grow bg-gray-100" type="text" value={editedCategory} onChange={handleInputChangeEditedCategory} />
                <button type="submit" className="px-2 text-base text-center bg-gray-300">Save</button>
            </form>
            {errors.map((error, index) => {
                return <h1 className="text-xs text-red-500 mt-0" key={index}>{error}</h1>
            })}
        </div>
    );
}

export default EditCategoriesForm;