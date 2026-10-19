import {useState} from 'react'

const TodoCreate = (props) => {
  const {onCreate} = props
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  const [title, setTitle] = useState('')
  const [total_pages, setTotalPages] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleTotalPagesChange = (event) => {
    setTotalPages(event.target.value)
  }


  const handleSubmit = (event) => {
    event.preventDefault()
    onCreate(title, total_pages)
    // clear the box. This is only possible BECAUSE the input is controlled.
    setTitle('')
    setTotalPages('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        placeholder="What book are you reading?"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <input
        type="number"
        value={total_pages}
        onChange={handleTotalPagesChange}
        placeholder="Total pages"
        className="flex-1 border border-gray-300 rounded px-3 py-2"
      />
      <button className="bg-blue-900 text-white px-5 py-2 rounded">Add</button>
    </form>
  )
}

export default TodoCreate
