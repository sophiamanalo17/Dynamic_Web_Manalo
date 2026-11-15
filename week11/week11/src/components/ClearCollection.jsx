import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {clearCollection} from '../store'

const ClearCollection = () => {
  const dispatch = useDispatch()

  // "are you sure?" lives here with useState, not in Redux.
  const [confirming, setConfirming] = useState(false)

  const handleYes = () => {
    dispatch(clearCollection())
    setConfirming(false)
  }

  if (!confirming) {
    return (
      <section className="flex justify-end border-b-4 border-ink p-5">
        <button
          onClick={() => setConfirming(true)}
          className="border-4 border-ink bg-flat-red px-3 py-1 text-xs font-black uppercase text-paper"
        >
          Clear collection
        </button>
      </section>
    )
  }

  //if the user clicks clear again after the warning message it clears the art
  return (
    <section className="flex items-center justify-end gap-3 border-b-4 border-ink p-5">
      <span className="text-xs font-black uppercase tracking-widest">
        Are you sure?
      </span>
      <button
        onClick={handleYes}
        className="border-4 border-ink bg-flat-red px-3 py-1 text-xs font-black uppercase text-paper"
      >
        Yes, clear
      </button>
      <button
        onClick={() => setConfirming(false)}
        className="border-4 border-ink bg-white px-3 py-1 text-xs font-black uppercase"
      >
        Cancel
      </button>
    </section>
  )
}

export default ClearCollection
