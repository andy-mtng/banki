function flashCardContainer(props) {
    const flashCards = props.flashCards;

    return (
        <div>
            <h1>Container</h1>
            {flashCards.map((flashCard) => {
                return <div key={flashCard.props.id}>{flashCard}</div>
            })}
        </div>
    ) 
}

export default flashCardContainer;
