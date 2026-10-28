import axios from 'axios'

// everything in this file knows one thing: how to talk to our server.
// No React in here at all.

//changed the url to look at books instead of todos!!
const BASE = 'http://localhost:3001'

export const fetchBooks = async () => {
  const response = await axios.get(`${BASE}/books`)
  return response.data
}

export const createBook= async (title, current_page, total_pages, author) => {
  // we send the title. The server sends back the whole book, WITH an id.
  // every new book starts out not done so the field is always there
  // inputs give us strings like "432", so Number() turns them into real numbers
  // ...unless you add it already on the last page -- same check as editing
  const done = Number(current_page) >= Number(total_pages)
  const response = await axios.post(`${BASE}/books`, {
    title,
    author,
    done,
    current_page: Number(current_page),
    total_pages: Number(total_pages),
    // stamp today's date so the finished list has one to show
    finished_date: done ? new Date().toISOString() : null,
  })
  return response.data
}

export const deleteBook = async (id) => {
  await axios.delete(`${BASE}/books/${id}`)
}

export const updateBook= async (book) => {
  // PUT REPLACES the record. Send the whole book, not just the bit that
  // changed, or everything else on it is gone.
  const response = await axios.put(`${BASE}/books/${book.id}`, book)
  return response.data
}
