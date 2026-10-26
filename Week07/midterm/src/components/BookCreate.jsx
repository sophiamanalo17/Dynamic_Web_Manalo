import {useState} from 'react'
import {validateBook} from '../validateBook'

// blank form
const EMPTY = {
  title: '',
  author: '',
  current_page: '',
  total_pages: '',
}

const validate = (values) => {
  const errors = validateBook(values)
  // can't have read more pages than the book has, so don't add it
  if (values.total_pages !== '' && Number(values.current_page) > Number(values.total_pages)) {
    errors.current_page = "You can't be past the last page."
  }
  return errors
}

const BookCreate = (props) => {
  const {onCreate} = props
  // the input's text lives here -- this component owns it, because nobody
  // else needs to know what you are halfway through typing
  // one object for every input. keys match each input's name
  const [values, setValues] = useState(EMPTY)
  // boxes you've clicked out of. errors only show for these
  const [touched, setTouched] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const errors = validate(values)

  const showError = (field) => {
    return touched[field] ? errors[field] : undefined
  }

  // one handler for every input
  const handleChange = (event) => {
    const {name, value} = event.target
    // only digits allowed (or empty, so you can still backspace everything)
    // if its a anything else except a number, then do not update the state and do not allow it to be typed in
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

    // submit = show every error
    setTouched({
      title: true,
      author: true,
      current_page: true,
      total_pages: true,
    })

    if (Object.keys(errors).length > 0) {
      return
    }

    // wait for the server before clearing. if it fails, typing stays
    setIsSubmitting(true)
    setSubmitError(null)
    try {
      await onCreate(values.title, values.current_page, values.total_pages, values.author)
      // clear the box. This is only possible BECAUSE the input is controlled.
      setValues(EMPTY)
      setTouched({})
    } catch (err) {
      console.error(err)
      setSubmitError('Could not save that. Your typing is still here -- try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // red when there's an error, gray when not
  const fieldClass = (field) => {
    const base = 'border rounded-full px-3 py-2 text-base'
    return showError(field)
      ? `${base} border-red-500 bg-red-50`
      : `${base} border-gray-300`
  }

  return (
    //need one handle submit once both inputs are filled out and then pass the values up to the parent component
    // 3 columns: title gets 3 parts, the two page boxes get 1 part each
    // (1 column on phones)
    // noValidate = skip the browser pop-ups, we show our own messages
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 items-start">
      {/* wrapping the input in a <label> ties the words to the box --
          clicking "Title" puts the cursor in the title input */}
      <div className="flex flex-col gap-1 text-sm">
        {/* the label text + star are wrapped in one <span>. The label is flex-col,
            so without the wrapper the star would drop onto its own line */}
        {/* htmlFor + id tie them now */}
        <label htmlFor="title">
          <span>Title <span className="text-red-600">*</span></span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="What book are you reading?"
          aria-invalid={showError('title') ? true : undefined}
          aria-describedby={showError('title') ? 'title-error' : undefined}
          className={fieldClass('title')}
        />
        {showError('title') && (
          <p id="title-error" className="text-red-700">{errors.title}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="current_page">
          <span>Current page <span className="text-red-600">*</span></span>
        </label>
        <input
          id="current_page"
          name="current_page"
          type="text"
          inputMode="numeric"
          value={values.current_page}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0"
          aria-invalid={showError('current_page') ? true : undefined}
          aria-describedby={showError('current_page') ? 'current_page-error' : undefined}
          className={fieldClass('current_page')}
        />
        {showError('current_page') && (
          <p id="current_page-error" className="text-red-700">{errors.current_page}</p>
        )}
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <label htmlFor="total_pages">
          <span>Total pages <span className="text-red-600">*</span></span>
        </label>
        <input
          id="total_pages"
          name="total_pages"
          type="text"
          inputMode="numeric"
          value={values.total_pages}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="432"
          aria-invalid={showError('total_pages') ? true : undefined}
          aria-describedby={showError('total_pages') ? 'total_pages-error' : undefined}
          className={fieldClass('total_pages')}
        />
        {showError('total_pages') && (
          <p id="total_pages-error" className="text-red-700">{errors.total_pages}</p>
        )}
      </div>
      {/* col-span-3 = stretch across all 3 columns, so author gets its own line */}
      <div className="sm:col-span-3 flex flex-col gap-1 text-sm">
        <label htmlFor="author">
          <span>Author <span className="text-red-600">*</span></span>
        </label>
        <input
          id="author"
          name="author"
          type="text"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Who wrote it?"
          aria-invalid={showError('author') ? true : undefined}
          aria-describedby={showError('author') ? 'author-error' : undefined}
          className={fieldClass('author')}
        />
        {showError('author') && (
          <p id="author-error" className="text-red-700">{errors.author}</p>
        )}
      </div>
      {submitError && (
        <p className="sm:col-span-3 rounded bg-red-50 p-3 text-sm text-red-700">{submitError}</p>
      )}
      {/* col-span-3 again so the button fills the whole width of the modal */}
      {/* disabled while saving = no double-click copies */}
      <button
        disabled={isSubmitting}
        className="sm:col-span-3 mt-2 bg-cyan-900 text-white px-5 py-2 rounded-full disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Add'}
      </button>
    </form>
  )
}

export default BookCreate
