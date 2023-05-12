import { useState, useEffect } from "react";
import FlashCardContainer from "./components/FlashCardContainer";
import Navbar from "./components/Navbar";
import FlashCardForm from "./components/FlashCardForm";
import "./styles/general.css";


function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [flashCardsState, setFlashCardsState] = useState(0); 


  const addFlashCard = (newFlashCard) => {
    setFlashCards([...flashCards, newFlashCard]);
  }


  const deleteFlashCard = (delId) => {
      console.log("Inside App.js. FlashCards array before:", flashCards);
      const updatedFlashCards = flashCards.filter(flashCard => {
        console.log(`FILTERING -- flashCard id: ${flashCard.id}, delId: ${delId}`);
        return flashCard.id !== delId;
      });
      setFlashCards(updatedFlashCards);
      setFlashCardsState(flashCardsState + 1); // increment state to trigger re-render
  }

  
  useEffect(() => {
    console.log("useEffect:", flashCards);
  }, [flashCards]);


  return (
    <div>
      <Navbar />
      <FlashCardForm addFlashCard={addFlashCard} />
      <FlashCardContainer flashCards={flashCards} flashCardsState={flashCardsState} deleteFlashCard={deleteFlashCard} />
    </div>
  );
}

export default App;
