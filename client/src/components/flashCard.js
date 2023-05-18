import { useState, useEffect } from 'react';

function FlashCard(props) {
    const [front, setFront] = useState(props.front);
    const [back, setBack] = useState(props.back);
    const [isFlipped, setIsFlipped] = useState(false);
    const [id, setId] = useState(props.id);

    const handleDelete = (event) => {
        // Prevents card flipping if delete button is pressed
        event.stopPropagation();
        props.deleteFlashCard(id);
        deleteFlashCard(id);
    }

    const deleteFlashCard = async (delId) => {
        const category = props.category;
        fetch(`http://localhost:5000/flashcard?id=${delId}&category=${category}`, {
            method: "DELETE"
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    }

    const handleEdit = (event) => {
        // Prevents card flipping if edit button is pressed
        event.stopPropagation();
        props.getFlashCardToEdit(id);
    }

    const flipFlashCard = () => {
        if (isFlipped) {
            setIsFlipped(false);
        } else {
            setIsFlipped(true);
            // Once the card is flipped, unflip it after certain amount of time automatically
            setTimeout(() => setIsFlipped(false), 5000);
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