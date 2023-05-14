import { useState } from "react";
import "../styles/forms.css"

function FlashCardForm(props) {
    const [cardFront, setCardFront] = useState(props.isEditing ? props.flashCardToEdit.front : '');
    const [cardBack, setCardBack] = useState(props.isEditing ? props.flashCardToEdit.back: '');
    const [nextId, setNextId] = useState(1);


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
        console.log('Card Submission values:', cardFront, cardBack, nextId);
        
        if (!props.isEditing) {
            const newFlashCard = {
                id: nextId,
                key: nextId,
                front: cardFront,
                back: cardBack,
            }
            props.addFlashCard(newFlashCard);
            createFlashCard(newFlashCard);
            setNextId(nextId + 1);
        } else {
            props.editFlashCard({
                id: props.flashCardToEdit.id,
                key: props.flashCardToEdit.key,
                front: cardFront,
                back: cardBack,
            });
        }

        setCardFront('');
        setCardBack('');
    }

    
    const createFlashCard = async (flashCardObj) => {
        console.log("createFlashCard()", flashCardObj);
        fetch("http://localhost:5000/flashcard", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(flashCardObj)
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
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