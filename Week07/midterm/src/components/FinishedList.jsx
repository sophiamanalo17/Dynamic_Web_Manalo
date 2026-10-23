import { CheckCircle } from "griddy-icons";


// read-only list: no checkbox, no edit, no delete -- finished books just show
// what you read and when you finished it
const FinishedList = (props) => {
  const {books} = props
  // App only sends us the finished books, so the count is just how many we got
  const finishedCount = books.length

  const renderedBooks = books.map((book) => {
    // finished_date is saved as a string like "2026-10-22T18:30:00.000Z".
    // new Date() turns it back into a date so we can show it nicely (10/22/2026)
    const finishedOn = book.finished_date
      ? new Date(book.finished_date).toLocaleDateString()
      : 'date unknown'

    return (
      <div key={book.id} className="flex items-center justify-between border-b border-gray-200 py-3 text-gray-500">
        {/* flex-col stacks title and author on top of each other, so the row
            only has 2 things to spread: this stack, and the date */}
        <div className="flex flex-col">
          <span>{book.title}</span>
          {/* only show the author line if the book has one (older books don't) */}
          {book.author && <span className="text-sm italic">by {book.author}</span>}
        </div>
        <span className="text-sm">
          {book.total_pages} pages · finished {finishedOn}
        </span>
      </div>
    )
  })

  return (
    
    <div className="mt-10">
      <div className="flex items-center gap-2 mb-6">
        <CheckCircle size={32}  />
        <h2 className="text-xl font-bold mb-2">Finished</h2>
      </div>
        {books.length === 0 && (
          <div className="flex px-4 py-6 bg-gray-100 rounded-lg mb-4 mt-4">
            <p className="text-gray-500">Nothing yet. Add something above.</p>
          </div>
        )}
      {renderedBooks}
      {/* outside the .map() so it shows once, under the whole list */}
      <p className="mt-6 text-sm text-gray-500">
        {finishedCount} {finishedCount === 1 ? 'book' : 'books'} finished
      </p>
    </div>
  )
}

export default FinishedList
