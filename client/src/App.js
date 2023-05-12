import { useState } from "react";
import FlashCardContainer from "./components/flashCardContainer";
import FlashCard from "./components/flashCard";
import "./styles.css";

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [newCardFront, setNewCardFront] = useState('');
  const [newCardBack, setNewCardBack] = useState('');

  const handleInputChangeFront = (event) => {
    setNewCardFront(event.target.value);
  }

  const handleInputChangeBack = (event) => {
    setNewCardBack(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Input value:', newCardFront, newCardBack);
    setFlashCards([...flashCards, <FlashCard 
      id={flashCards.length} 
      front={newCardFront}
      back={newCardBack}/>
    ]);
    setNewCardFront('');
    setNewCardBack('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newCardFront} onChange={handleInputChangeFront} />
        <input type="text" value={newCardBack} onChange={handleInputChangeBack}/>
        <button type="submit">Submit</button>
      </form>
      <FlashCardContainer flashCards={flashCards} />
    </div>
  );
}

export default App;
