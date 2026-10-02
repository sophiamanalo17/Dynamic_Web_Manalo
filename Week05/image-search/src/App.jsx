/*
1. my project has one effect, in this fil, with an empty dependency array []. it loads the default "cats" images when 
the page first opens, so it only needs to run once on mount, and nothing it reads changes between renders. leaving the 
array off would cause an endless loop, bc the effect sets state and that triggers a re-render. 

2. putting images in the dependency array would cause an infinite loop. the effect fetches and calls setImages, which changes
 images, which re-runs the effect, which fetches again. each fetch returns a new array and reactcompares arrays by reference,
  so it never stops. that would use up the 50 requests per hour in seconds. its liek asking for an image to be fetched endlessly 
  because it tracks when the image element is changed ( believe i am a bit scared to try it bc of the limit lol)
*/

import {useEffect, useRef, useState} from 'react'
import SearchBar from './components/SearchBar'
import ImageList from './components/ImageList'
import {searchImages} from './api'

const App = () => {

  const DEFAULT_SEARCH_TERM = 'cats'

  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searched, setSearched] = useState(true)
  const [searchTerm, setSearchTerm] = useState(DEFAULT_SEARCH_TERM)
  const initialSearchStarted = useRef(false)



  const handleSubmit = async (term) => {
    setIsLoading(true)
    setError(null)
    setSearched(true)
    setSearchTerm(term)

    try {
      // console.log(`Searching for: ${term}`)
      // since our imageSearch function is async and we need to await the results,
      // we need to await when calling searchImages()
      // which means, you need to flag this function async
      const results = await searchImages(term)
      setImages(results)
    } catch (err) {
      console.error(err)
      setError('The search did not work. Check the console.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (initialSearchStarted.current) return
    initialSearchStarted.current = true

    const loadDefaultImages = async () => {
      try {
        const results = await searchImages(DEFAULT_SEARCH_TERM)
        setImages(results)
      } catch (err) {
        console.error(err)
        setError('The search did not work. Check the console.')
      } finally {
        setIsLoading(false)
      }
    }

    loadDefaultImages()
  }, [])

  return (
    <div>
      <SearchBar onSubmit={handleSubmit} /> <br />
      {isLoading && <p className="p-4 text-gray-500">Searching ...</p>}
      {error && <p className="p-4 text-red-500">{error}</p>}
      {!isLoading && !error && searched && images.length === 0 && (
        <p className="p-4 text-gray-500">
          No photos for that one. Try another word!
        </p>
      )}
      <ImageList images={images} term={searchTerm} />
    </div>
  )
}

export default App
