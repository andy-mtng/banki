import { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import "../styles/flashcardAnimation.css";

function FlashCard(props) {
    const [front, setFront] = useState(props.front);
    const [back, setBack] = useState(props.back);
    const [isFlipped, setIsFlipped] = useState(false);
    const [id, setId] = useState(props.id);
    const { user } = useAuthContext();

    const handleDelete = (event) => {
        // Prevents card flipping if delete button is pressed
        event.stopPropagation();
        props.deleteFlashCard(id);
        deleteFlashCard(id);
    }

    const deleteFlashCard = async (delId) => {
        const category = props.category;
        fetch(`http://localhost:5000/flashcard?id=${delId}&category=${category}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
    }

    const handleEdit = (event) => {
        // Prevents card flipping if edit button is pressed
        event.stopPropagation();
        props.getFlashCardToEdit(id);
    }

    const flipFlashCard = () => {
        if (isFlipped) {
            setIsFlipped(false);
        } else {
            setIsFlipped(true);
            // Once the card is flipped, unflip it after certain amount of time automatically
            setTimeout(() => setIsFlipped(false), 5000);
        }
    }

    useEffect(() => {
        setFront(props.front);
        setBack(props.back);
    }, [props.front, props.back])

    return (
        // <div className="rounded-lg w-full h-60 p-4 bg-blue-100 shadow-md flex flex-col justify-between" onClick={flipFlashCard}>
        //     <div className="flex justify-center items-center">
        //         <h1 className="break-all mt-8">{isFlipped ? back : front}</h1>
        //     </div>
        //     <div className="flex gap-3 ml-auto">
        //         <button onClick={handleEdit}>Edit</button>
        //         <button onClick={handleDelete}>Delete</button>
        //     </div>
        // </div>
        // <div className="group w-full h-60 p-4 [perspective:1000px]">
        //     <div className="bg-blue-100 h-full w-full rounded-lg shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
        //         <div className="flex justify-center">
        //             <h1 className="mt-8">{front}</h1>
        //         </div>
        //         <div className="relative [transform:rotateX(180deg)] [backface-visibility:hidden]">
        //             <h1 className="text-base inset-0 font-medium absolute">{back}</h1>
        //         </div>
        //     </div>
        // </div>   
        <div class="group h-60 w-full [perspective:1000px]">
            <div class="bg-blue-100 relative h-full w-full rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                <div class="absolute inset-0 opacity-100 group-hover:opacity-0">
                    <h1 className="text-center mt-8">{front}</h1>
                </div>
                <div class="absolute inset-0 h-full w-full rounded-xl px-12 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div class="flex min-h-full flex-col items-center">
                        <h1 class="mt-8">{back}</h1>
                    </div>
                </div>
            </div>
      </div>   
    );
}

export default FlashCard;