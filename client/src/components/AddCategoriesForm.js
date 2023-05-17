import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

function CategoriesForm(props) {
    const [category, setCategory] = useState("");

    const handleInputChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("CategoriesForm submission:", category);
        const id = uuidv4();
        props.addCategory({
            clientAssignedId: id,
            key: id,
            categoryName: category,
            flashCards: []
        });
        setCategory('');
    }

    return (
        <div>
            <h1>Add Category</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={category} onChange={handleInputChangeCategory}/>
                <button type="submit">+</button>
            </form>
        </div>
    )
}

export default CategoriesForm;