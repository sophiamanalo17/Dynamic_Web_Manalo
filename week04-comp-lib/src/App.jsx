// Import libraries first…
import {Routes, Route} from 'react-router-dom'
// …then our own components…
import Navbar from './components/NavBar'
import ButtonPage from './pages/ButtonPage'
import AccordionPage from './pages/AccordionPage'
import DropdownPage from './pages/DropdownPage'
import CarouselPage from './pages/CarouselPage'

const App = () => {
  return (
    <div className="container mx-auto grid grid-cols-6 gap-4 mt-4">
      <div>
        <Navbar />
      </div>
      <div className="col-span-5">
        <Routes>
          <Route path="/" element={<ButtonPage />} />
          <Route path="/accordion" element={<AccordionPage />} />
          <Route path="/dropdown" element={<DropdownPage />} />
          <Route path="/carousel" element={<CarouselPage />} />

        </Routes>
      </div>
    </div>
  )
}

export default App