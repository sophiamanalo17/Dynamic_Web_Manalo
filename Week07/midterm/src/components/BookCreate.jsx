import {useState} from 'react'
import {validateBook} from '../validateBook'
import Input from './Input'

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

  return (
    //need one handle submit once both inputs are filled out and then pass the values up to the parent component
    // 3 columns: title gets 3 parts, the two page boxes get 1 part each
    // (1 column on phones)
    // noValidate = skip the browser pop-ups, we show our own messages
    <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-[minmax(0,3fr)_minmax(0,1fr)_minmax(0,1fr)] gap-3 items-start">
      {/* wrapping the input in a <label> ties the words to the box --
          clicking "Title" puts the cursor in the title input */}
      {/* label, box, and error message all live in Input.jsx now */}
      <Input
        id="title"
        name="title"
        label="Title"
        required
        value={values.title}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="What book are you reading?"
        error={showError('title')}
        inputClassName="text-base"
      />
      <Input
        id="current_page"
        name="current_page"
        label="Current page"
        required
        inputMode="numeric"
        value={values.current_page}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="0"
        error={showError('current_page')}
        inputClassName="text-base"
      />
      <Input
        id="total_pages"
        name="total_pages"
        label="Total pages"
        required
        inputMode="numeric"
        value={values.total_pages}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="432"
        error={showError('total_pages')}
        inputClassName="text-base"
      />
      {/* col-span-3 = stretch across all 3 columns, so author gets its own line */}
      <Input
        id="author"
        name="author"
        label="Author"
        required
        value={values.author}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Who wrote it?"
        error={showError('author')}
        className="sm:col-span-3"
        inputClassName="text-base"
      />
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
