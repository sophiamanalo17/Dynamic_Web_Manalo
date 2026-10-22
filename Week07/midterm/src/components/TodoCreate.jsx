import {useState} from 'react'

const TodoCreate = (props) => {
  const {onCreate} = props
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  const [current_page, setCurrentPage] = useState('')
  const [total_pages, setTotalPages] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

    const handleCurrentPageChange = (event) => {
    const value = event.target.value
    // only digits allowed (or empty, so you can still backspace everything)
    // if its a anything else except a number, then do not update the state and do not allow it to be typed in
    if (/^\d*$/.test(value)) {
      setCurrentPage(value)
    }
  }

  const handleTotalPagesChange = (event) => {
    const value = event.target.value
    // only digits allowed (or empty, so you can still backspace everything)
    // if its a anything else except a number, then do not update the state and do not allow it to be typed in
    if (/^\d*$/.test(value)) {
      setTotalPages(value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title, current_page, total_pages)
    // clear the box. This is only possible BECAUSE the input is controlled.
    setTitle('')
    setCurrentPage('')
    setTotalPages('')
  }

  return (
    //need one handle submit once both inputs are filled out and then pass the values up to the parent component
    <form onSubmit={handleSubmit} className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="What book are you reading?"
        className="border border-gray-300 rounded-full px-3 py-2"
      />
      <input
        type="text"
        inputMode="numeric"
        value={current_page}
        onChange={handleCurrentPageChange}
        placeholder="Current pg #"
        className="border border-gray-300 rounded-full px-3 py-2"
      />
      <input
        type="text"
        inputMode="numeric"
        value={total_pages}
        onChange={handleTotalPagesChange}
        placeholder="Total pg #"
        className="border border-gray-300 rounded-full px-3 py-2"
      />
      <button className="bg-cyan-900 text-white px-5 py-2 rounded-full">Add</button>
    </form>
  )
}

export default TodoCreate
