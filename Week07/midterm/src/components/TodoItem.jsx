import {useState} from 'react'
import TodoEdit from './TodoEdit'
import { Edit } from "griddy-icons";


const TodoItem = (props) => {
  const {book, onDelete, onEdit, onFinish} = props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleFinish = () => {
    onFinish(book.id)
  }

  const handleSubmit = (id, newTitle, newCurrentPage, newTotalPages) => {
    onEdit(id, newTitle, newCurrentPage, newTotalPages)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return <TodoEdit book={book}onSubmit={handleSubmit} onDelete={onDelete} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <label className="flex items-center gap-3">
        {/* if todo finished is done then undo (and also crossout) but if not then display finish */}
        {/* === true so a todo with no done field is still a plain false, not undefined */}
        <input
          type="checkbox"
          checked={book.finished === true}
          onChange={handleFinish}
        />
        {/* if todo is done strikethrough */}
        <span className={book.finished ? 'text-gray-400 line-through' : ''}>
          {book.title}
        </span>
      </label>
      {/* documentation from https://react.dev/reference/react-dom/components/progress */}
      {/* relative = the box the text gets positioned inside */}
      <div className="relative w-40 h-5">
        <progress value={book.current_page} max={book.total_pages} className="w-full h-full bg-gray-200" />
        {/* absolute inset-0 = stretch the text over the whole bar, then center it */}
        <span className="absolute inset-0 flex items-center justify-center text-xs">
          {book.current_page}/{book.total_pages}
        </span>
      </div>
      <div className="flex gap-3 text-sm">
        <button onClick={handleEditClick} className="text-gray-700">
          <Edit size={24}  />
        </button>
      </div>
    </div>
  )
}

export default TodoItem
