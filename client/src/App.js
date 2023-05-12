import { useState } from "react";
import FlashCardContainer from "./components/FlashCardContainer";
import Navbar from "./components/Navbar";
import FlashCardForm from "./components/FlashCardForm";
import "./styles/general.css";


function App() {
  const [flashCards, setFlashCards] = useState([]);

  const addFlashCard = (newFlashCard) => {
    setFlashCards([...flashCards, newFlashCard]);
  }

  const deleteFlashCard = (delId) => {
      const updatedFlashCards = flashCards.filter(flashCard => flashCard.props.id !== delId);
      setFlashCards(updatedFlashCards);
  }

  return (
    <div>
      <Navbar />
      <FlashCardForm addFlashCard={addFlashCard} deleteFlashCard={deleteFlashCard} />
      <FlashCardContainer flashCards={flashCards} />
    </div>
  );
}

export default App;
