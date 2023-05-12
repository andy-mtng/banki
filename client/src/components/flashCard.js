import { useState, useEffect } from 'react';

function FlashCard(props) {
    const [front, setFront] = useState(props.front);
    const [back, setBack] = useState(props.back);

    return (
        <div>
            <h1>Front: {front}</h1>
            <h1>Back: {back}</h1>
        </div>
    )
}

export default FlashCard;