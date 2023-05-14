import { useState } from 'react';

function FlashCard(props) {
    const [front, setFront] = useState(props.front);
    const [back, setBack] = useState(props.back);
    const [id, setId] = useState(props.id);


    const handleDelete = () => {
        console.log("handleDelete(); in FlashCard.js", id);
        props.deleteFlashCard(id);
    }


    const handleEdit = () => {
        console.log("handleEdit(); in FlashCard.js", id);
        props.getFlashCardToEdit(id);
    }

    
    return (
        <div className="flash-card">
            <h1>Front: {front}</h1>
            <h1>Back: {back}</h1>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleEdit}>Edit</button>
        </div>
    );
}

export default FlashCard;