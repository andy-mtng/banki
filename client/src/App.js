import { useState, useEffect } from "react";
import FlashCardContainer from "./components/FlashCardContainer";
import Navbar from "./components/Navbar";
import FlashCardForm from "./components/FlashCardForm";
import "./styles/general.css";


function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [flashCardsState, setFlashCardsState] = useState(0); 
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [flashCardToEdit, setFlashCardToEdit] = useState({});


  const handleAddCardButtonClick = () => {
    setIsEditing(false);
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


  const getFlashCardToEdit = (editId) => {
    setIsEditing(true);
    const cardToEdit = flashCards.find(flashCard => flashCard.id === editId);
    setFlashCardToEdit(cardToEdit);
    setShowForm(true);
  }


  const editFlashCard = (editedFlashCard) => {
    const updatedFlashCards = flashCards.map(flashCard => {
      if (flashCard.id === editedFlashCard.id) {
        return editedFlashCard;
      } else {
        return flashCard;
      }
    })
    setFlashCards(updatedFlashCards);
    setFlashCardToEdit({});
    setIsEditing(false);
    setFlashCardsState(flashCardsState + 1); // increment state to trigger re-render
  }

  
  useEffect(() => {
    console.log("useEffect:", flashCards);
  }, [flashCards]);


  return (
    <div>
      <Navbar />
      <button onClick={handleAddCardButtonClick}>Add New Card +</button>
      { showForm && <FlashCardForm 
        isEditing={isEditing} 
        addFlashCard={addFlashCard} 
        editFlashCard={editFlashCard}
        handleXButtonClick={handleXButtonClick}
        flashCardToEdit={isEditing ? flashCardToEdit : {}}/> }
      <FlashCardContainer 
        flashCards={flashCards} 
        flashCardsState={flashCardsState} 
        deleteFlashCard={deleteFlashCard} 
        getFlashCardToEdit={getFlashCardToEdit}/>
    </div>
  );
}

export default App;
