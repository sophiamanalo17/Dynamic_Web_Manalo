import BookItem from './BookItem'
import EmptyState from './EmptyState'
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
          <EmptyState message="No books in progress. Click + Add book to start one." />
        )}
      {renderedBooks}

        <p className="mt-6 text-sm text-gray-500">
        {activeCount} {activeCount === 1 ? 'book' : 'books'} to read
      </p>
    </div>
  )
}

export default BookList
