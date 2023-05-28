import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from "../hooks/useAuthContext";

function CategoriesForm(props) {
    const [category, setCategory] = useState("");
    const { user } = useAuthContext();
    const [errors, setErrors] = useState([]);

    const handleInputChangeCategory = (event) => {
        setCategory(event.target.value);
    }

    const validate = () => {
        const validationErrors = []

        if (category === "") {
            validationErrors.push("Category cannot be empty.")
        }

        if (category.length > 32) {
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

    useEffect(() => {
        console.log("useEffect errors", errors);
    }, [errors]);

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="flex">
                <input className="flex-grow border border-gray-300 h-9 w-full" type="text" value={category} onChange={handleInputChangeCategory}/>
                <button className="bg-gray-300 w-10 h-9 font-bold ml-1" type="submit">+</button>
            </form>
            {errors.map((error, index) => {
                return <h1 className="text-sm text-red-500" key={index}>{error}</h1>
            })}
        </div>
    )
}

export default CategoriesForm;