import "../styles/flashcards.css";

function flashCardContainer(props) {
    const flashCards = props.flashCards;

    return (
        <div className="flash-card-container">
            {flashCards.map((flashCard) => {
                return <div key={flashCard.props.id}>{flashCard}</div>
            })}
        </div>
    ) 
}

export default flashCardContainer;
