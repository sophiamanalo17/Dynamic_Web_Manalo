import axios from 'axios'

// everything in this file knows one thing: how to talk to our server.
// No React in here at all.

//changed the url to look at books instead of todos!!
const BASE = 'http://localhost:3001'

export const fetchTodos = async () => {
  const response = await axios.get(`${BASE}/books`)
  return response.data
}

export const createTodo = async (title) => {
  // we send the title. The server sends back the whole todo, WITH an id.
  // every new todo starts out not done so the field is always there
  const response = await axios.post(`${BASE}/books`, {title, done: false, current_page: 0, total_pages: 432})
  return response.data
}

export const deleteTodo = async (id) => {
  await axios.delete(`${BASE}/books/${id}`)
}

export const updateTodo = async (todo) => {
  // PUT REPLACES the record. Send the whole todo, not just the bit that
  // changed, or everything else on it is gone.
  const response = await axios.put(`${BASE}/books/${todo.id}`, todo)
  return response.data
}
