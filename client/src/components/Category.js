import { useState } from "react";

function Category(props) {
    const [categoryName, setCategoryName] = useState(props.categoryName);

    return (
        <div>
            <h1>{categoryName}</h1>
        </div>
    )
}

export default Category;