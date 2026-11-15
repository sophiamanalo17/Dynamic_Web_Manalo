import {useSelector, useDispatch} from 'react-redux'
import {changeSearchTerm, filterArt} from '../store'

const ArtSearch = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.art.searchTerm)
  // is sorting on right now? we need this so the button can flip it
  const sorte = useSelector((state) => state.art.sorte)

  const handleChange = (event) => {
    dispatch(changeSearchTerm(event.target.value))
  }

  return (
    <section className="flex items-center gap-3 border-b-4 border-ink p-5">
      <label
        htmlFor="search"
        className="text-xs font-black uppercase tracking-widest"
      >
        Search
      </label>

      <input
        id="search"
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Filter by Name"
        className="flex-1 border-4 border-ink bg-white px-3 py-2"
      />

      <button
        onClick={() => dispatch(filterArt(!sorte))}
        className="border-4 border-ink bg-white px-3 py-2"
      >
        {/* is sorte selected right now? */}
        {sorte ? 'Unsort' : 'Sort by price'}
      </button>
    </section>
  )
}

export default ArtSearch
