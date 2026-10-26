// rules both forms share (add + edit)
// returns {} when everything is fine
export const validateBook = (values) => {
  const errors = {}

  if (!values.title.trim()) {
    errors.title = 'A book needs a title.'
  }

  if (!values.author.trim()) {
    errors.author = 'Who wrote it?'
  }

  if (values.current_page === '') {
    errors.current_page = "What page are you on? Put 0 if you haven't started."
  }

  if (values.total_pages === '') {
    errors.total_pages = 'How many pages is the book?'
  } else if (Number(values.total_pages) < 1) {
    errors.total_pages = 'Has to be at least 1 page.'
  }

  return errors
}
