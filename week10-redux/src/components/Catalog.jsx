//dispatch to use data and select data from the store
import {useDispatch, useSelector} from 'react-redux'
import {PRINTS} from '../data/prints'
import {itemAdded} from '../features/cartSlice'
import {favouriteToggled, selectFavouriteIds} from '../features/favouritesSlice'
import {filterChanged, favoriteFilterChanged} from '../features/uiSlice'

const SWATCH = {
  red: 'bg-flat-red',
  blue: 'bg-flat-blue',
  yellow: 'bg-flat-yellow',
}

const FILTERS = ['all', 'red', 'blue', 'yellow']

const Catalog = () => {
  // all ths is doing is giving us direct access to store's dispatch function
  // this is the SAME dispatch idea we met with useReducer, except this is one dispatch for the entire app
  const dispatch = useDispatch()
  const colorFilter = useSelector((state) => state.ui.colorFilter)
  const favoriteFilter = useSelector((state) => state.ui.favoriteFilter)

  // the filled or empty star comes from the store, NOT from a useState in here
  const favouriteIds = useSelector(selectFavouriteIds)

  const byColor =
  colorFilter === 'all' ? PRINTS : PRINTS.filter((print) => print.color === colorFilter)

  const visible = favoriteFilter
    ? byColor.filter((print) => favouriteIds.includes(print.id))
    : byColor

  return (
    <section>
      <div className='flex border-4 border-ink mb-4'>
        {FILTERS.map((filter) => {
          const isActive = colorFilter === filter
          return (
            <button
              key={filter}
              onClick={() => dispatch(filterChanged(filter))}
              className={`flex-1 border-r-4 border-ink last:border-r-0 px-3 py-1 text-xs font-black uppercase ${
                isActive ? 'bg-ink text-paper' : 'bg-paper'
              }`}
            >
              {filter}
            </button>
          )
        })}

        <button
          onClick={() => dispatch(favoriteFilterChanged(!favoriteFilter))}
          aria-pressed={favoriteFilter}
          className={`flex-1 border-r-4 border-ink last:border-r-0 px-3 py-1 text-xs font-black uppercase ${
            favoriteFilter ? 'bg-ink text-paper' : 'bg-paper'
          }`}
        >
          ★ Favs
        </button>
      </div>

      <ul className="grid grid-cols-2">
        {visible.map((print) => {
          const isFavourite = favouriteIds.includes(print.id)

          return (
            <li key={print.id} className="border-b-4 border-r-4 border-ink">
              <div className={`relative h-28 ${SWATCH[print.color]}`}>
                <button
                  onClick={() => dispatch(favouriteToggled(print.id))}
                  aria-pressed={isFavourite}
                  aria-label={`Favourite ${print.title}`}
                  className={`absolute right-0 top-0 h-9 w-9 border-b-4 border-l-4 border-ink text-lg font-black leading-none ${
                    isFavourite ? 'bg-ink text-paper' : 'bg-paper text-ink'
                  }`}
                >
                  {isFavourite ? '★' : '☆'}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 px-3 py-3">
                <div>
                  <p className="text-sm font-black uppercase">{print.title}</p>
                  <p className="text-xs">${print.price}</p>
                </div>

                {/* itemAdded(print)  does NOT change anything! it builds an action object, and dispatch is what sends it*/}
                <button
                  className="border-4 border-ink bg-flat-yellow px-3 py-1 text-xs font-black uppercase"
                  onClick={() => dispatch(itemAdded(print))}
                >
                  Add
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default Catalog
