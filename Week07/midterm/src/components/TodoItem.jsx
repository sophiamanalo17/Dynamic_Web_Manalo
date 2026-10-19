import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {book, onDelete, onEdit, onFinish} = props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    onDelete(book.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleFinish = () => {
    onFinish(book.id)
  }

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return <TodoEdit todo={book} onSubmit={handleSubmit} />
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
          {book.title} — {Math.round(book.current_page / book.total_pages * 100)}%
        </span>
      </label>
      <div className="flex gap-3 text-sm">
        <button onClick={handleEditClick} className="text-blue-700">
          edit
        </button>
        <button onClick={handleDelete} className="text-red-600">
          delete
        </button>
      </div>
    </div>
  )
}

export default TodoItem
