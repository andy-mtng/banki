import "../styles/flashcards.css";
import { useEffect, useState } from "react";
import FlashCard from "./FlashCard";

function FlashCardContainer(props) {
    const flashCards = props.flashCards;
    const [flashCardsStateLocal, setFlashCardsStateLocal] = useState(0); // initialize to 0

    useEffect(() => {
        setFlashCardsStateLocal(props.flashCardsState);
    }, [props.flashCardsState]);

    return (
        <div className="flash-card-container">
            {flashCards.map((flashCard) => {
                return <FlashCard 
                            id={flashCard.id} 
                            key={flashCard.key}
                            front={flashCard.front} 
                            back={flashCard.back} 
                            deleteFlashCard={props.deleteFlashCard}
                            getFlashCardToEdit={props.getFlashCardToEdit}/>
            })}
        </div>
    ) 
}

export default FlashCardContainer;
