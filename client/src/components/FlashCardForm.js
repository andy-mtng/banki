import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import "../styles/forms.css"

function FlashCardForm(props) {
    const [cardFront, setCardFront] = useState(props.isEditing ? props.flashCardToEdit.front : '');
    const [cardBack, setCardBack] = useState(props.isEditing ? props.flashCardToEdit.back: '');


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
        fetch("http://localhost:5000/flashcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
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
                "Content-Type": "application/json"
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
        <div className="form-container">
            <button onClick={handleXButtonClick}>X</button>
            <h1>{props.isEditing ? "Edit Flashcard" : "Add New Flashcard:" }</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardFront">Front: </label>
                    <input id="cardFront" type="text" value={cardFront} onChange={handleInputChangeFront} />
                </div>
                <div>
                    <label htmlFor="cardBack">Back: </label>
                    <input id="cardBack" type="text" value={cardBack} onChange={handleInputChangeBack}/>
                </div>
                <button type="submit">{props.isEditing ? "Save" : "Submit"}</button>
            </form>
        </div>
    );
}

export default FlashCardForm;