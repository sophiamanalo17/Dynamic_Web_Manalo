import React from 'react'
import Carousel from '../components/Carousel'

//dummy data for me to use & 'bg-[hex]' for tailwind + temp literal
const SLIDES = [
  { id: 1, label: "Slide 1", color: "bg-[#f4a261]" },
  { id: 2, label: "Slide 2", color: "bg-[#2a9d8f]" },
  { id: 3, label: "Slide 3", color: "bg-[#e76f51]" },
];

const CarouselPage = () => {
  return (
    <div>
      <Carousel slides={SLIDES} />
    </div>
  )
}

export default CarouselPage