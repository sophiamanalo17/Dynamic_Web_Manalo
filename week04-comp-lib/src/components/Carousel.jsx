import React from 'react'
import {useState} from 'react'
import {GoChevronLeft, GoChevronRight} from 'react-icons/go'
import Button from './Button'

// const SLIDES = [
//   { id: 1, label: "Slide 1", color: "#f4a261" },
//   { id: 2, label: "Slide 2", color: "#2a9d8f" },
//   { id: 3, label: "Slide 3", color: "#e76f51" },
// ];


// slides come in as a prop from CarouselPage (same idea as items in Accordion)
// each slide looks like { id, label, color } where color is 'bg-[hex]' for tailwind
const Carousel = (props) => {
  const {slides}= props
  //index current state, setIndex the setter, initial index is zero
  const [index, setIndex] = useState(0)

  //nothing to show if we didn't get any slides
  if (!slides || slides.length === 0) return null

  //keeps track of the current slide
  const slide = slides[index]

//makes an infite loop so if the index is zero (the first) and we go to prev it will index to the last one else go to the previous one
  const prev = () => setIndex(index === 0 ? slides.length - 1 : index - 1)
  //same loop ere but if we hit the end it will go to the first slide
  const next = () => setIndex(index === slides.length - 1 ? 0 : index + 1)

  //return the carousel
  return (
    <div className="flex items-center gap-4">
      {/* onClick we call the function prev */}
      <Button primary rounded onClick={prev}><GoChevronLeft /></Button>

      {/* flex + items-center + justify-center puts the label in the middle of the box */}
      <div className={ `w-64 h-40 text-white ${ slide.color }`}>
        {slide.label}
      </div>

     {/* onClick we call the function next */}
      <Button primary rounded onClick={next}><GoChevronRight /></Button>
    </div>
  )
}

export default Carousel
