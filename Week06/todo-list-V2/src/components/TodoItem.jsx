import {useState} from 'react'
import TodoEdit from './TodoEdit'

const TodoItem = (props) => {
  const {todo, onDelete, onEdit, onFinish} = props
  // THIS one belongs here. Whether this row is showing its edit form is
  // nobody else's business -- App does not care, the other rows do not care.
  const [showEdit, setShowEdit] = useState(false)

  const handleDelete = () => {
    onDelete(todo.id)
  }

  const handleEditClick = () => {
    setShowEdit(!showEdit)
  }

  const handleFinish = () => {
    onFinish(todo.id)
  }

  const handleSubmit = (id, newTitle) => {
    onEdit(id, newTitle)
    // close the form once the edit has gone up
    setShowEdit(false)
  }

  if (showEdit) {
    return <TodoEdit todo={todo} onSubmit={handleSubmit} />
  }

  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-3">
      <label className="flex items-center gap-3">
        {/* if todo finished is done then undo (and also crossout) but if not then display finish */}
        {/* === true so a todo with no done field is still a plain false, not undefined */}
        <input
          type="checkbox"
          checked={todo.done === true}
          onChange={handleFinish}
        />
        {/* if todo is done strikethrough */}
        <span className={todo.done ? 'text-gray-400 line-through' : ''}>
          {todo.title}
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
