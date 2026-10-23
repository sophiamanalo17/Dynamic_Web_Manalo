import {useState} from 'react'

const BookCreate = (props) => {
  const {onCreate} = props
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  const [current_page, setCurrentPage] = useState('')
  const [total_pages, setTotalPages] = useState('')
  const [author, setAuthor] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
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
    // can't have read more pages than the book has, so don't add it
    if (Number(current_page) > Number(total_pages)) {
      return
    }

    
    onCreate(title, current_page, total_pages, author)
    // clear the box. This is only possible BECAUSE the input is controlled.
    setTitle('')
    setCurrentPage('')
    setTotalPages('')
    setAuthor('')
  }

  return (
    //need one handle submit once both inputs are filled out and then pass the values up to the parent component
    // 3 columns: title gets 3 parts, the two page boxes get 1 part each
    <form onSubmit={handleSubmit} className="grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3">
      {/* wrapping the input in a <label> ties the words to the box --
          clicking "Title" puts the cursor in the title input */}
      <label className="flex flex-col gap-1 text-sm">
        {/* the label text + star are wrapped in one <span>. The label is flex-col,
            so without the wrapper the star would drop onto its own line */}
        <span>Title <span className="text-red-600">*</span></span>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="What book are you reading?"
          // required = browser won't submit the form while this is empty
          required
          className="border border-gray-300 rounded-full px-3 py-2 text-base"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span>Current page <span className="text-red-600">*</span></span>
        <input
          type="text"
          inputMode="numeric"
          value={current_page}
          onChange={handleCurrentPageChange}
          placeholder="0"
          required
          className="border border-gray-300 rounded-full px-3 py-2 text-base"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span>Total pages <span className="text-red-600">*</span></span>
        <input
          type="text"
          inputMode="numeric"
          value={total_pages}
          onChange={handleTotalPagesChange}
          placeholder="432"
          required
          className="border border-gray-300 rounded-full px-3 py-2 text-base"
        />
      </label>
      {/* col-span-3 = stretch across all 3 columns, so author gets its own line */}
      <label className="col-span-3 flex flex-col gap-1 text-sm">
        <span>Author <span className="text-red-600">*</span></span>
        <input
          type="text"
          value={author}
          onChange={handleAuthorChange}
          placeholder="Who wrote it?"
          required
          className="border border-gray-300 rounded-full px-3 py-2 text-base"
        />
      </label>
      {/* col-span-3 again so the button fills the whole width of the modal */}
      <button className="col-span-3 mt-2 bg-cyan-900 text-white px-5 py-2 rounded-full">Add</button>
    </form>
  )
}

export default BookCreate
