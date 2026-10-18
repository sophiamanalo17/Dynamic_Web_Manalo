import {useState, useEffect} from 'react'
import Card from './Card'
import Bilbo from '../assets/bilbo-baggins.png'
import Cameron from '../assets/cameron-poe.png'
import Nikki from '../assets/nikki-cage.png'
import Pollux from '../assets/pollux-troy.png'

const cardImages = [{src: Bilbo}, {src: Cameron}, {src: Nikki}, {src: Pollux}]

const Grid = () => {
  // the deck lives in state, because the board has to change when somebody
  // clicks New Game
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [turns, setTurns] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [won, setWon] = useState(false)

  const shuffleCards = () => {
    const shuffled = [...cardImages, ...cardImages]
      // sort calls this for pairs of items. A negative number leaves them
      // alone, a positive number swaps them -- so a random one shuffles.
      .sort(() => Math.random() - 0.5)
      // every card needs its own id: there are two of each image now, so
      // `src` no longer tells the two copies apart
      .map((card) => ({...card, id: crypto.randomUUID()}))

    setCards(shuffled)
    setTurns(0)
    setWon(false)
  }

  const handleChoice = (card) => {
    // ignore clicks while a turn is resolving, and on cards already face up
    if (disabled || card === choiceOne || card.matched) return
    // no choice yet? this is choice one. Otherwise it is choice two.
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }

  // state updates show up on the next render, so the comparison can't live in
  // handleChoice -- it runs here, once both choices have actually been set
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        console.log('match')
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        // a match stays face up, so there's nothing to wait for
        resetTurn()
      } else {
        console.log('no match')
        // wait a second so the player can see the second card before both
        // flip back
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  // the matched flags only exist after setCards re-renders, so check for the
  // win here, whenever the deck changes. The length check stops an empty deck
  // (before the first New Game) from counting as a win.
  useEffect(() => {
    if (cards.length > 0 && cards.every((card) => card.matched)) {
      setWon(true)
    }
  }, [cards])

  return (
    <>
      <button
        onClick={shuffleCards}
        className="bg-blue-900 text-white uppercase px-8 py-4 rounded-lg mb-6"
      >
        New Game
      </button>

      <h1 className="text-2xl mb-6">Turns: {turns}</h1>

      {won && (
        <p className="text-2xl text-green-700 mb-6">
          You won in {turns} turns!
        </p>
      )}

      <div className="grid grid-cols-4 gap-4 max-w-3xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>
    </>
  )
}

export default Grid
