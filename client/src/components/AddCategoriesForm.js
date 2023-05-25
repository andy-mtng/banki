import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from "../hooks/useAuthContext";

function CategoriesForm(props) {
    const [category, setCategory] = useState("");
    const { user } = useAuthContext();

    const handleInputChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const id = uuidv4();
        const newCategory = {
            clientAssignedId: id,
            key: id,
            categoryName: category,
            flashCards: []
        }
        props.addCategory(newCategory);
        createCategory(newCategory);
        setCategory('');
    }

    const createCategory = async (categoryObj) => {
        fetch("http://localhost:5000/category", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(categoryObj)
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(error => {
            console.error("There was a problem with the request:", error);
        });
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