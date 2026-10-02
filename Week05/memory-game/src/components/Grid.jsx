import { useState, useEffect } from 'react'
import Card from './Card'
import Earth from '../assets/earth.jpeg'
import Human from '../assets/human.jpeg'
import Monet from '../assets/monet.jpeg'
import Glass from '../assets/glass.jpeg'

// Four images. A real game needs eight cards -- two of each -- in a random
// order, which is the first thing we do in class.
const cardImages = [{src: Earth}, {src: Human}, {src: Monet}, {src: Glass}]

const Grid = () => {
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [score, setScore] = useState(0)
  const [tryCount, setTryCount] = useState(0)
  const [bestScore, setBestScore] = useState(null)

  const shuffleCards = () => {
    //sort calls this for pairs of items, a negative leaves them alone and + swaps them 
    const shuffled = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5)
    // every card needs its own card component with a unique ID, there are 2 images now 
    //src no longer tells the 2 copies apart
    .map((card) => ({...card, id: crypto.randomUUID()}))


    setCards(shuffled)
    resetTurn()
    setScore(0)
    setTryCount(0)
  }

  // the grid remembers which cards were clicked, the card just reports the click
  const handleChoice = (card) => {
    //ignore clicks while two cards are already up, on the same card twice, or on a matched card
    if (choiceTwo || card === choiceOne || card.matched) return

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //reset function to clear the choices after a turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)

  }

  //runs after every render where a choice changed, so both choices are up to date here
  //important to note that a change has to be made to re -render ...c onsidr for the counters
    useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        // the updater form: React hands us the current cards and we return
        // the new ones. Never edit `cards` directly -- build a new array.
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }
            return card
          })
        })
        resetTurn()
        setScore(score + 1)
        // console.log(cards.length)
        setTryCount(tryCount + 1)

        // checks if all cards matched, and if so remember the best score
        if (score + 1 === cardImages.length) {
          const finalTries = tryCount + 1
          //fewer tries is better, and null means no round has been finished yet
          if (bestScore === null || finalTries < bestScore) {
            setBestScore(finalTries)
          }
        }
      } else {
        // without the wait, the pair is compared and reset before the 0.6s
        // flip has finished -- nobody ever sees the second card
        setTimeout(() => resetTurn(), 1200)
        setTryCount(tryCount + 1)
      }
    }
  }, [choiceOne, choiceTwo])

  return (
    <>
      <button className="bg-blue-500 text-white px-4 py-4 rounded" onClick={shuffleCards}>Shuffle Cards</button>
      <div className="grid grid-cols-4 gap-4 max-w-3xl py-8">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />  
        ))}
      </div>
      <p className="text-lg font-bold">Score: {score}</p>
      <p className="text-lg font-bold">Tries (this round): {tryCount}</p>
      <p className="text-lg font-bold">High Score: {bestScore === null ? '-' : bestScore}</p>
    </>
  )
}

export default Grid
