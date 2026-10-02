import {useState} from 'react'
import {searchImages} from './api'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'

const App = () => {
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (term) => {
    setIsLoading(true)
    setError(null)
    setSearched(true)

    try{
    // console.log(`searching 4... ${term}`)
    //since img search function async and we need to await results
    //we need to await when calling search images
    //which means you need to flag this function async
  
      const results = await searchImages(term)
      setImages(results)
    } catch(err) {
      console.error(err)
      setError("The search did not work, check console")
    } finally {
      setIsLoading(false)
    }
  }
  return <div className="p-4">
    <SearchBar onSubmit = {handleSubmit}></SearchBar> <br/>
    {isLoading && <p className='p-4 text-gray-500'> Searching....</p>}
    {error && <p className='p-4 text-red-500'>{error}</p>}
    {searched && !isLoading && !error && images.length === 0 && (
      <p className='p-4 text-gray-500'>No images found.</p>
    )}
    <ImageList images={images} />
  </div>
}

export default App