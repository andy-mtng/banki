import { useState, useEffect } from "react";
import FlashCardContainer from "./components/FlashCardContainer";
import Navbar from "./components/Navbar";
import FlashCardForm from "./components/FlashCardForm";
import "./styles/general.css";


function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [flashCardsState, setFlashCardsState] = useState(0); 
  const [showForm, setShowForm] = useState(false);

  const handleAddCardButtonClick = () => {
    setShowForm(true);
  }

  const handleXButtonClick = () => {
    setShowForm(false);
  }


  const addFlashCard = (newFlashCard) => {
    setFlashCards([...flashCards, newFlashCard]);
  }


  const deleteFlashCard = (delId) => {
      const updatedFlashCards = flashCards.filter(flashCard => {
        return flashCard.id !== delId;
      });
      setFlashCards(updatedFlashCards);
      setFlashCardsState(flashCardsState + 1); // increment state to trigger re-render
  }


  const editFlashCard = (editId) => {
    // Find flash card to edit
    // Change fields in flash card
  }

  
  useEffect(() => {
    console.log("useEffect:", flashCards);
  }, [flashCards]);


  return (
    <div>
      <Navbar />
      <button onClick={handleAddCardButtonClick}>Add New Card +</button>
      { showForm && <FlashCardForm addFlashCard={addFlashCard} handleXButtonClick={handleXButtonClick}/> }
      <FlashCardContainer 
        flashCards={flashCards} 
        flashCardsState={flashCardsState} 
        deleteFlashCard={deleteFlashCard} 
        editFlashCard={editFlashCard}/>
    </div>
  );
}

export default App;
