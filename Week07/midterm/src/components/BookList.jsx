import BookItem from './BookItem'

const BookList = (props) => {
  const {books, onDelete, onEdit, onFinish} = props

  const renderedBooks = books.map((book) => {
    return (
      <BookItem key={book.id} book={book} onDelete={onDelete} onEdit={onEdit} onFinish={onFinish} />
    )
  })

  return (
    <div>
      <h1>My Books</h1>
      {renderedBooks}
    </div>
  )
}

export default BookList
