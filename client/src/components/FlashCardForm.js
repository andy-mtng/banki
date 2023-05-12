import { useState } from "react";
import "../styles/forms.css"

function FlashCardForm(props) {
    const [newCardFront, setNewCardFront] = useState('');
    const [newCardBack, setNewCardBack] = useState('');
    const [nextId, setNextId] = useState(1);
  
    const handleInputChangeFront = (event) => {
      setNewCardFront(event.target.value);
    }
  
    const handleInputChangeBack = (event) => {
      setNewCardBack(event.target.value);
    }
  
    const handleSubmit = (event) => {
        event.preventDefault(); 
        console.log('Input value:', newCardFront, newCardBack, nextId);
        props.addFlashCard({
            id: nextId,
            key: nextId,
            front: newCardFront,
            back: newCardBack,
        })
        setNextId(nextId + 1);
        setNewCardFront('');
        setNewCardBack('');
    }

    return (
        <div className="form-container">
            <h1>Add New Flashcard: </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardFront">Front: </label>
                    <input id="cardFront" type="text" value={newCardFront} onChange={handleInputChangeFront} />
                </div>
                <div>
                    <label htmlFor="cardBack">Back: </label>
                    <input id="cardBack" type="text" value={newCardBack} onChange={handleInputChangeBack}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FlashCardForm;