import {useState} from 'react'
import { TrashAlt } from "griddy-icons";
import {validateBook} from '../validateBook'

const BookEdit = (props) => {
  const {book, onSubmit, onDelete} = props
  // start the input at the todo's CURRENT title, so editing means changing
  // what is there rather than retyping it
  // String() so pages act like typed text, same as the add form
  const [values, setValues] = useState({
    title: book.title,
    author: book.author || '',
    current_page: String(book.current_page),
    total_pages: String(book.total_pages),
  })
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const errors = validateBook(values)

  const showError = (field) => {
    return touched[field] ? errors[field] : undefined
  }

  // ids need the book id so two open edit forms don't clash
  const idFor = (field) => `${field}-${book.id}`

  const handleChange = (event) => {
    const {name, value} = event.target
    // digits only for the page boxes
    const isPageField = name === 'current_page' || name === 'total_pages'
    if (isPageField && !/^\d*$/.test(value)) {
      return
    }
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    setTouched({
      title: true,
      author: true,
      current_page: true,
      total_pages: true,
    })

    if (Object.keys(errors).length > 0) {
      return
    }

    //if user inputs number grater than total pages, then the book is done
    // NOTE: we can't just do book.done = true here. book is a prop, so changing it
    // doesn't save to the server or make React re-render. Instead we cap the page
    // at the total and send it up -- App sees current_page >= total_pages and
    // saves the book as done.
    const currentPage = Number(values.current_page) > Number(values.total_pages)
      ? values.total_pages
      : values.current_page

    // form stays open with your edits if the save fails
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await onSubmit(book.id, values.title, currentPage, values.total_pages, values.author)
    } catch (err) {
      console.error(err)
      setSubmitError('Could not save that. Your changes are still here -- try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = () => {
    onDelete(book.id)
  }

  const fieldClass = (field) => {
    const base = 'border rounded-full px-3 py-2'
    return showError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border-gray-300`
  }

  // same layout as the add form
  return (
    <form onSubmit={handleSubmit} noValidate className="py-3 grid grid-cols-1 sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-2 mb-6 items-start">
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor={idFor('title')}>Title</label>
        <input
          id={idFor('title')}
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('title') ? true : undefined}
          aria-describedby={showError('title') ? idFor('title-error') : undefined}
          className={fieldClass('title')}
        />
        {showError('title') && (
          <p id={idFor('title-error')} className="text-red-700">{errors.title}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor={idFor('current_page')}>Current page</label>
        <input
          id={idFor('current_page')}
          name="current_page"
          type="text"
          inputMode="numeric"
          value={values.current_page}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('current_page') ? true : undefined}
          aria-describedby={showError('current_page') ? idFor('current_page-error') : undefined}
          className={fieldClass('current_page')}
        />
        {showError('current_page') && (
          <p id={idFor('current_page-error')} className="text-red-700">{errors.current_page}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor={idFor('total_pages')}>Total pages</label>
        <input
          id={idFor('total_pages')}
          name="total_pages"
          type="text"
          inputMode="numeric"
          value={values.total_pages}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('total_pages') ? true : undefined}
          aria-describedby={showError('total_pages') ? idFor('total_pages-error') : undefined}
          className={fieldClass('total_pages')}
        />
        {showError('total_pages') && (
          <p id={idFor('total_pages-error')} className="text-red-700">{errors.total_pages}</p>
        )}
      </div>
      <div className="sm:col-span-3 flex flex-col gap-1 text-sm">
        <label htmlFor={idFor('author')}>Author</label>
        <input
          id={idFor('author')}
          name="author"
          type="text"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('author') ? true : undefined}
          aria-describedby={showError('author') ? idFor('author-error') : undefined}
          className={fieldClass('author')}
        />
        {showError('author') && (
          <p id={idFor('author-error')} className="text-red-700">{errors.author}</p>
        )}
      </div>
      {submitError && (
        <p className="sm:col-span-3 rounded bg-red-50 p-3 text-sm text-red-700">{submitError}</p>
      )}
      <div className="sm:col-span-3 flex justify-end gap-2 text-sm">
        <button type="button" onClick={handleDelete} className="text-red-600">
            <TrashAlt size={24}  />
          </button>
        <button
          disabled={isSubmitting}
          className="bg-blue-900 text-white px-4 py-2 rounded text-sm rounded-full disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  )
}

export default BookEdit
