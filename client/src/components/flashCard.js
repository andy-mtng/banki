import { useState } from 'react';

function FlashCard(props) {
    const [front, setFront] = useState(props.front);
    const [back, setBack] = useState(props.back);
    const [id, setId] = useState(props.id);

    const handleDelete = () => {
        console.log("In FlashCard.js", id);
        props.deleteFlashCard(id);
    }

    return (
        <div className="flash-card">
            <h1>Front: {front}</h1>
            <h1>Back: {back}</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default FlashCard;