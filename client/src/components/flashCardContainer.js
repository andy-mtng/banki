function flashCardContainer(props) {
    const flashCards = props.flashCards;

    return (
        <div>
            <h1>Container</h1>
            {flashCards.map((flashCard, index) => {
                return <div key={index}>{flashCard}</div>
            })}
        </div>
    ) 
}

export default flashCardContainer;
