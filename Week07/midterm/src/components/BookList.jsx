import BookItem from './BookItem'
import { Book } from "griddy-icons"

const BookList = (props) => {
  const {books, onDelete, onEdit, onFinish} = props
  // App only sends us the books still being read, so the count is just how many we got
  const activeCount = books.length

  const renderedBooks = books.map((book) => {
    return (
      <BookItem key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} onFinish={onFinish} />
    )
  })

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Book size={24}  />
        <h1 className="text-xl font-bold">My Books</h1>
      </div>
        {books.length === 0 && (
          <div className="flex px-4 py-6 bg-gray-100 rounded-lg mb-4 mt-4">
            <p className="text-gray-500">Nothing yet. Add something above.</p>
          </div>
        )}
      {renderedBooks}

        <p className="mt-6 text-sm text-gray-500">
        {activeCount} {activeCount === 1 ? 'book' : 'books'} to read
      </p>
    </div>
  )
}

export default BookList
