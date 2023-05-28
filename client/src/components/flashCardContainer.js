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
        <div className="px-16 mt-9 grid grid-cols-3 gap-6 bg-yellow-200 justify-items-center">
            {flashCards.map((flashCard) => {
                return <FlashCard 
                            id={flashCard.id} 
                            key={flashCard.key}
                            front={flashCard.front} 
                            back={flashCard.back} 
                            category={props.category}
                            deleteFlashCard={props.deleteFlashCard}
                            getFlashCardToEdit={props.getFlashCardToEdit}/>
            })}
        </div>
    ) 
}

export default FlashCardContainer;
