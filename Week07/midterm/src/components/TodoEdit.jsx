import {useState} from 'react'
import { TrashAlt } from "griddy-icons";

const TodoEdit = (props) => {
  const {book, onSubmit, onDelete} = props
  // start the input at the todo's CURRENT title, so editing means changing
  // what is there rather than retyping it
  const [title, setTitle] = useState(book.title)
  const [currentPage, setCurrentPage] = useState(book.current_page)
  const [totalPages, setTotalPages] = useState(book.total_pages)

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  
  const handleCurrentPageChange = (event) => {
    setCurrentPage(event.target.value)
  }

  const handleTotalPagesChange = (event) => {
    setTotalPages(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    //if user inputs number grater than total pages, then the book is done
    // NOTE: we can't just do book.done = true here. book is a prop, so changing it
    // doesn't save to the server or make React re-render. Instead we cap the page
    // at the total and send it up -- App sees current_page >= total_pages and
    // saves the book as done.
    if (Number(currentPage) > Number(totalPages)) {
      onSubmit(book.id, title, totalPages, totalPages)
      return
    }
    onSubmit(book.id, title, currentPage, totalPages)
  }

  const handleDelete = () => {
    onDelete(book.id)
  }


  return (
    <form onSubmit={handleSubmit} className="flex gap-2 py-3 grid grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)_auto] gap-2 mb-6">
      <input
        type="text"
        value={title}
        onChange={handleTitleChange}
        className="flex-1 border border-gray-300 rounded px-3 py-2 rounded-full"
      />
      <input
        type="text"
        value={currentPage}
        onChange={handleCurrentPageChange}
        className="flex-1 border border-gray-300 rounded px-3 py-2 rounded-full"
      />
      <input
        type="text"
        value={totalPages}
        onChange={handleTotalPagesChange}
        className="flex-1 border border-gray-300 rounded px-3 py-2 rounded-full"
      />
      <div className="flex gap-2 text-sm">
        <button type="button" onClick={handleDelete} className="text-red-600">
            <TrashAlt size={24}  />
          </button>
        <button className="bg-blue-900 text-white px-4 py-2 rounded text-sm rounded-full">
          Save
        </button>
      </div>
    </form>
  )
}

export default TodoEdit
  