// 1. In the body, the fetch runs on every render, and since the fetch itself causes
// a render, it loops forever. In useEffect with [], it runs only once, when the component
//  first appears. 

//2. if you move it above the await you would probably see the item in the list disappear but because
//setodo runs first the server never truly deleted the line item (it fake deletes)

//3. it doesnt use a request because no information is being changed or updated on the server end
//put, get, post, delete arent being used, its simply changing what a viewer sees instead

import {useState, useEffect} from 'react'
import BookCreate from './components/BookCreate'
import CreateModal from './components/CreateModal'
import BookList from './components/BookList'
import FinishedList from './components/FinishedList'
import BookFilter from './components/BookFilter'
import EmptyState from './components/EmptyState'
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
  // is the "add a book" pop-up open? starts closed
  const [showCreate, setShowCreate] = useState(false)
  // which lists to show: 'all', 'current', or 'finished'. Lives here because
  // the filter buttons AND the lists both need to know it
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

  const createTodo = async (title, current_page, total_page, author) => {
    // the server makes the id now, so we no longer invent one
    const newTodo = await createTodoRequest(title, current_page, total_page, author)
    const updatedTodos = [...todos, newTodo]
    setTodos(updatedTodos)
    // book is saved, so close the pop-up
    setShowCreate(false)
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

  const editTodoById = async (id, newTitle, newCurrentPage, newTotalPages, author) => {
    // find the whole todo and send all of it, because PUT replaces
    const todo = todos.find((todo) => todo.id === id)
    // reached the last page = finished
    const done = Number(newCurrentPage) >= Number(newTotalPages)
    // Number() because inputs hand us strings like "120"
    const updated = await updateTodoRequest({
      ...todo,
      title: newTitle,
      current_page: Number(newCurrentPage),
      total_pages: Number(newTotalPages),
      done,
      // stamp today's date when the book gets finished
      finished_date: done ? new Date().toISOString() : null,
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
    const current_page = done ? todo.total_pages : 0
    // stamp today's date when the box gets checked, clear it if unchecked
    const finished_date = done ? new Date().toISOString() : null
    const updated = await updateTodoRequest({...todo, done, current_page, finished_date})
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
  // split into two lists: still reading (editable) and finished (read-only)
  const readingBooks = todos.filter((todo) => !todo.done)
  const finishedBooks = todos.filter((todo) => todo.done)

  const activeCount = readingBooks.length

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Reading List</h1>
        <button
          onClick={() => setShowCreate(true)}
          className="bg-cyan-900 text-white px-5 py-2 rounded-full"
        >
          + Add book
        </button>
      </div>

      {/* only show the pop-up when showCreate is true */}
      {showCreate && (
        <CreateModal title="Add a book" onClose={() => setShowCreate(false)}>
          <BookCreate onCreate={createTodo} />
        </CreateModal>
      )}
      {isLoading && <p className="text-gray-500">Loading your books...</p>}

      {error && (
        <p className="rounded bg-red-50 p-3 text-red-700">{error}</p>
      )}

      {!isLoading && !error && todos.length === 0 ? (
        <EmptyState message="Nothing yet. Click + Add book to start." />
      ) : (
        <>
          <BookFilter
            filter={filter}
            onChange={setFilter}
            // one number per button. The keys match the button names exactly
            counts={{
              all: todos.length,
              current: readingBooks.length,
              finished: finishedBooks.length,
            }}
          />
          {/* current list shows on "all" or "current" */}
          {filter !== 'finished' && (
            <BookList books={readingBooks} onDelete={deleteTodoById} onEdit={editTodoById} onFinish={finishTodoById} />
          )}
          {/* finished list shows on "finished" (even if empty, so you see the
              "nothing yet" message), or on "all" when there's at least one */}
          {(filter === 'finished' || (filter === 'all' && finishedBooks.length > 0)) && (
            <FinishedList books={finishedBooks} />
          )}
        </>
      )}
    </div>
  )
}

export default App
