import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useAuthContext } from "../hooks/useAuthContext";

function FlashCardForm(props) {
    const [cardFront, setCardFront] = useState(props.isEditing ? props.flashCardToEdit.front : '');
    const [cardBack, setCardBack] = useState(props.isEditing ? props.flashCardToEdit.back: '');
    const { user } = useAuthContext();

    const handleInputChangeFront = (event) => {
        setCardFront(event.target.value);
    }
  

    const handleInputChangeBack = (event) => {
        setCardBack(event.target.value);
    }

    
    const handleXButtonClick = () => {
        props.handleXButtonClick();
    }
  

    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Card Submission values:', cardFront, cardBack);
        
        if (!props.isEditing) {
            const id = uuidv4();
            const newFlashCard = {
                id: id,
                key: id,
                front: cardFront,
                back: cardBack,
            }
            console.log(newFlashCard);
            props.addFlashCard(newFlashCard);
            createFlashCard(newFlashCard);
        } else {
            const editedFlashCard = {
                id: props.flashCardToEdit.id,
                key: props.flashCardToEdit.key,
                front: cardFront,
                back: cardBack,
            }
            props.editFlashCard(editedFlashCard);
            updateFlashCard(editedFlashCard);
        }

        setCardFront('');
        setCardBack('');
    }

    
    const createFlashCard = async (flashCardObj) => {
        const category = props.category;
        fetch(`http://localhost:5000/flashcard?category=${category}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(flashCardObj)
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(error => {
            console.error("There was a problem with the request:", error);
        });
    }


    const updateFlashCard = async (flashCardObj) => {
        fetch("http://localhost:5000/flashcard", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            },
            body: JSON.stringify(flashCardObj)
        })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch(error => {
            console.log("There was a problem with the request:", error);
        })
    }


    return (
        <div className="bg-white w-96 h-70 px-6 py-5 rounded-lg relative shadow-md">
            <button className="absolute right-4 top-4" onClick={handleXButtonClick}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-gray-500">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <h1 className="text-lg font-semibold mb-5">{props.isEditing ? "Edit Flashcard" : "Add New Flashcard" }</h1>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <div className="flex flex-col mb-3">
                    <label htmlFor="cardFront">Front</label>
                    <input className="border border-gray-400 h-9" id="cardFront" type="text" value={cardFront} onChange={handleInputChangeFront} />
                </div>
                <div className="flex flex-col mb-5">
                    <label htmlFor="cardBack">Back</label>
                    <input className="border border-gray-400 h-9" id="cardBack" type="text" value={cardBack} onChange={handleInputChangeBack}/>
                </div>
                <button className="ml-auto bg-gray-200 px-3 py-2 rounded-lg font-semibold text-sm" type="submit">{props.isEditing ? "SAVE" : "SUBMIT"}</button>
            </form>
        </div>
    );
}

export default FlashCardForm;