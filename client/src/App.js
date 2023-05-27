import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import FlashCardContainer from "./components/FlashCardContainer";
import Navbar from "./components/Navbar";
import FlashCardForm from "./components/FlashCardForm";
import "./styles/general.css";
import { useAuthContext } from "./hooks/useAuthContext";


function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [flashCardsState, setFlashCardsState] = useState(0); 
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [flashCardToEdit, setFlashCardToEdit] = useState({});
  const [functionCallFlag, setFunctionCallFlag] = useState(0);
  const { category } = useParams(); 
  const { user } = useAuthContext();


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


  const getFlashCards = async () => {
    fetch(`http://localhost:5000/category/${category}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${user.token}`
      }
    })
    .then(response => response.json())
    .then((flashCardData) => {
      const processedFlashCards = [];
      console.log(flashCardData.flashCards);
      flashCardData.flashCards.map(flashCard => {
        processedFlashCards.push({                
          id: flashCard.clientAssignedId,
          key: flashCard.clientAssignedId,
          front: flashCard.front,
          back: flashCard.back})
      })
      setFlashCards(processedFlashCards);
    })
    .catch(error => {
      console.error("There was a problem with the request:", error);
    });
  }

  useEffect(() => {
    getFlashCards();
  }, []);

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


  return (
    <div className="bg-gray-100 w-screen h-screen relative">
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="mt-6 text-2xl font-semibold mb-3">{category}</h1>
        <button className="bg-blue-900 px-4 py-2 rounded-lg text-white font-base" onClick={handleAddCardButtonClick}>Add New Card</button>
      </div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">  
          { showForm && <FlashCardForm
            isEditing={isEditing}
            addFlashCard={addFlashCard}
            editFlashCard={editFlashCard}
            handleXButtonClick={handleXButtonClick}
            category={category}
            flashCardToEdit={isEditing ? flashCardToEdit : {}}/> }
      </div>
      <FlashCardContainer 
        flashCards={flashCards} 
        flashCardsState={flashCardsState} 
        deleteFlashCard={deleteFlashCard} 
        getFlashCardToEdit={getFlashCardToEdit}
        category={category}/>
    </div>
  );
}

export default App;
