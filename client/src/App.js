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
  const [functionCallFlag, setFunctionCallFlag] = useState(0);


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
    console.log(editId);
    setIsEditing(true);
    setShowForm(false);
    const cardToEdit = flashCards.find(flashCard => flashCard.id === editId);
    setFlashCardToEdit(cardToEdit);
    setFunctionCallFlag(functionCallFlag + 1);
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
    setShowForm(false);
    setFlashCardsState(flashCardsState + 1); // increment state to trigger re-render
  }

  
  useEffect(() => {
    // Allows population of form with flashcard data if it is already up
    // Checks if there is data to show (object is not empty)
    if (Object.keys(flashCardToEdit).length > 0) {
      setShowForm(true);
    }
    // functionCallFlag is used to run this hook everytime the edit form is meant to appear
  }, [flashCardToEdit, functionCallFlag]);

  
  useEffect(() => {
    console.log("useEffect:", flashCards);
  }, [flashCards]);


  useEffect(() => {
    console.log(showForm);
  }, [showForm]);


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
