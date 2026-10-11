import TodoItem from './TodoItem'

const TodoList = (props) => {
  const {todos, onDelete, onEdit, onFinish} = props

  const renderedTodos = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} onDelete={onDelete} onEdit={onEdit} onFinish={onFinish} />
    )
  })

  return <div>{renderedTodos}</div>
}

export default TodoList
