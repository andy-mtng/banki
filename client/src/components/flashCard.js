import { useState, useEffect } from 'react';

function FlashCard(props) {
    const [front, setFront] = useState(props.front);
    const [back, setBack] = useState(props.back);
    const [isFlipped, setIsFlipped] = useState(false);
    const [id, setId] = useState(props.id);


    const handleDelete = () => {
        console.log("handleDelete(); in FlashCard.js", id);
        props.deleteFlashCard(id);
    }


    const handleEdit = () => {
        console.log("handleEdit(); in FlashCard.js", id);
        props.getFlashCardToEdit(id);
    }


    const flipFlashCard = () => {
        if (isFlipped) {
            setIsFlipped(false);
        } else {
            setIsFlipped(true);
            // Once the card is flipped, unflip it after certain amount of time automatically
            const timer = setTimeout(() => setIsFlipped(false), 5000);
        }
    }


    useEffect(() => {
        setFront(props.front);
        setBack(props.back);
    }, [props.front, props.back])


    return (
        <div className="flash-card" onClick={flipFlashCard}>
            <h1>{isFlipped ? `Back: ${back}` : `Front: ${front}`}</h1>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default FlashCard;