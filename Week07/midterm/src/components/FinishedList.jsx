// read-only list: no checkbox, no edit, no delete -- finished books just show
// what you read and when you finished it
const FinishedList = (props) => {
  const {books} = props

  const renderedBooks = books.map((book) => {
    // finished_date is saved as a string like "2026-10-22T18:30:00.000Z".
    // new Date() turns it back into a date so we can show it nicely (10/22/2026)
    const finishedOn = book.finished_date
      ? new Date(book.finished_date).toLocaleDateString()
      : 'date unknown'

    return (
      <div key={book.id} className="flex items-center justify-between border-b border-gray-200 py-3 text-gray-500">
        <span>{book.title}</span>
        <span className="text-sm">
          {book.total_pages} pages · finished {finishedOn}
        </span>
      </div>
    )
  })

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-2">Finished</h2>
      {renderedBooks}
    </div>
  )
}

export default FinishedList
