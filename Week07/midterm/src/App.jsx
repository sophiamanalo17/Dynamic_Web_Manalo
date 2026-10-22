// 1. In the body, the fetch runs on every render, and since the fetch itself causes
// a render, it loops forever. In useEffect with [], it runs only once, when the component
//  first appears. 

//2. if you move it above the await you would probably see the item in the list disappear but because
//setodo runs first the server never truly deleted the line item (it fake deletes)

//3. it doesnt use a request because no information is being changed or updated on the server end
//put, get, post, delete arent being used, its simply changing what a viewer sees instead

import {useState, useEffect} from 'react'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'
import TodoFilter from './components/TodoFilter'
import {
  fetchTodos,
  createTodo as createTodoRequest,
  deleteTodo as deleteTodoRequest,
  updateTodo as updateTodoRequest,
} from './api'

const App = () => {
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  // lives here, not in TodoFilter: the buttons AND the list both need it,
  // and App is the closest parent they share
  const [filter, setFilter] = useState('all')

  // [] = run once, when the component first appears. NOT every render --
  // that would fetch, set state, re-render, fetch again, forever.
  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todos = await fetchTodos()
        setTodos(todos)
      } catch (err) {
        // the usual cause: you forgot to start the server in the second tab
        console.error(err)
        setError('Could not reach the server. Is `npm run server` running?')
      } finally {
        setIsLoading(false)
      }
    }
    loadTodos()
  }, [])

  const createTodo = async (title, current_page, total_pages) => {
    // the server makes the id now, so we no longer invent one
    const newTodo = await createTodoRequest(title, current_page, total_pages)
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
  }

  const deleteTodoById = async (id) => {
    // ask the server first. If it refuses, we never touch our state, and the
    // screen keeps telling the truth.
    await deleteTodoRequest(id)

    const updatedTodos = todos.filter((todo) => {
      return todo.id !== id
    })
    setTodos(updatedTodos)
  }

  const editTodoById = async (id, newTitle, newCurrentPage, newTotalPages) => {
    // find the whole todo and send all of it, because PUT replaces
    const todo = todos.find((todo) => todo.id === id)
    // Number() because inputs hand us strings like "120"
    const updated = await updateTodoRequest({
      ...todo,
      title: newTitle,
      current_page: Number(newCurrentPage),
      total_pages: Number(newTotalPages),
      // reached the last page = finished
      done: Number(newCurrentPage) >= Number(newTotalPages),
    })

    // map returns a new array the SAME length. Every todo comes back; the one
    // we edited comes back as the object the SERVER sent us
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  //similar pattern to edit but changing the done status
  const finishTodoById = async (id) => {
    const todo = todos.find((todo) => todo.id === id)
    // flip it: false -> true, true -> false (so you can "undo" a finish too)
    const done = !todo.done
    // checking the box = finished the book, so jump to the last page.
    // unchecking leaves current_page alone so you don't lose your place
    const current_page = done ? todo.total_pages : todo.current_page
    const updated = await updateTodoRequest({...todo, done, current_page})
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return updated
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  // no request here. We already have every todo, so this is just filter on
  // data we are holding. Worked out fresh every render, never stored in state --
  // a second copy of the todos would fall out of date the moment one changed.
  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.done
    }
    if (filter === 'done') {
      return todo.done
    }
    return true
  })

  // "to do" means not done yet. Counted from ALL todos, not visibleTodos, so
  // the number stays the same whichever filter button is selected.
  const activeCount = todos.filter((todo) => !todo.done).length

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">My Reading List</h1>
      <TodoCreate onCreate={createTodo} />
      {isLoading && <p className="text-gray-500">Loading your books...</p>}

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>
      )}

      {!isLoading && !error && todos.length === 0 ? (
        <p className="text-gray-500">Nothing yet. Add something above.</p>
      ) : (
        <>
          <TodoFilter filter={filter} onChange={setFilter} />
          <TodoList todos={visibleTodos} onDelete={deleteTodoById} onEdit={editTodoById} onFinish={finishTodoById} />
        </>
      )}

      <p className="mt-6 text-sm text-gray-500">
        {activeCount} {activeCount === 1 ? 'book' : 'books'} to read
      </p>
    </div>
  )
}

export default App
