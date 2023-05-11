import { useState } from 'react';
import FlashCardContainer from './components/flashCardContainer';

function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [newFlashCardInput, setNewFlashCardInput] = useState('');


  const handleInputChange = (event) => {
    setNewFlashCardInput(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault(); 
    console.log('Input value:', newFlashCardInput);
    setFlashCards([...flashCards, newFlashCardInput]);
    setNewFlashCardInput('');
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newFlashCardInput} onChange={handleInputChange} />
        <button type="submit">Submit</button>
      </form>
      <FlashCardContainer flashCards={flashCards} />
    </div>
  );
}

export default App;
