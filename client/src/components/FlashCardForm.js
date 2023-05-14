import { useState } from "react";
import "../styles/forms.css"

function FlashCardForm(props) {
    const [cardFront, setCardFront] = useState('');
    const [cardBack, setCardBack] = useState('');
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
        console.log('Input value:', cardFront, cardBack, nextId);
        props.addFlashCard({
            id: nextId,
            key: nextId,
            front: cardFront,
            back: cardBack,
        })
        setNextId(nextId + 1);
        setCardFront('');
        setCardBack('');
    }


    return (
        <div className="form-container">
            <button onClick={handleXButtonClick}>X</button>
            <h1>Add New Flashcard: </h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="cardFront">Front: </label>
                    <input id="cardFront" type="text" value={cardFront} onChange={handleInputChangeFront} />
                </div>
                <div>
                    <label htmlFor="cardBack">Back: </label>
                    <input id="cardBack" type="text" value={cardBack} onChange={handleInputChangeBack}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FlashCardForm;