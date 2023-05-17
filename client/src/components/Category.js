import { useState } from "react";

function Category(props) {
    const [categoryName, setCategoryName] = useState(props.categoryName);
    const [id, setId] = useState(props.id);

    const handleDelete = () => {
        props.deleteCategory(id);
    }

    return (
        <div>
            <h1>{categoryName}</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default Category;