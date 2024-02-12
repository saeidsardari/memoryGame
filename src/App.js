import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/aquaman.jpg", matched: false},
  {"src": "/img/batman.jpg", matched: false},
  {"src": "/img/captain-america.jpg", matched: false},
  {"src": "/img/fantastic-four.jpg", matched: false},
  {"src": "/img/flash.jpg", matched: false},
  {"src": "/img/ironman.jpg", matched: false}
]
function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card)=>({...card, id : Math.random()}))

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
    
  }
  
  // handle a choice
   const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // campare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCards(prevCards => {
          return prevCards.map(card =>{
            if (card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(()=>resetTurn(),1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurn => prevTurn +1)
    setDisabled(false)
  }

  useEffect(() => {
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className='card-grid'>
        {cards.map(card =>(
  
      <SingleCard  
        key ={card.id}
        card={card}
        handleChoice={handleChoice}
        flipped = {card === choiceOne || card === choiceTwo || card.matched}
        disabled = {disabled}
        />

        ))}
      </div>
      <p>turns : {turns}</p>
    </div>
  );
}

export default App;
