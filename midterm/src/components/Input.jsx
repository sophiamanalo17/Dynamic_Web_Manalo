// one labeled box + its error message. both forms (add + edit) use this
// so the error stuff only lives in one place
const Input = (props) => {
  const {
    id,
    name,
    label,
    value,
    onChange,
    onBlur,
    error,
    required,
    placeholder,
    inputMode,
    className = '',
    inputClassName = '',
  } = props

  // the error <p> gets its own id so the input can point at it
  const errorId = `${id}-error`

  // red when there's an error, gray when not
  const base = `border rounded-full px-3 py-2 ${inputClassName}`
  const fieldClass = error
    ? `${base} border-red-500 bg-red-50`
    : `${base} border-gray-300`

  return (
    <div className={`flex flex-col gap-1 text-sm ${className}`}>
      {/* the label text + star are wrapped in one <span>. The label is flex-col,
          so without the wrapper the star would drop onto its own line */}
      {/* htmlFor + id tie them now */}
      <label htmlFor={id}>
        <span>{label} {required && <span className="text-red-600">*</span>}</span>
      </label>
      <input
        id={id}
        name={name}
        type="text"
        inputMode={inputMode}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={fieldClass}
      />
      {error && (
        <p id={errorId} className="text-red-700">{error}</p>
      )}
    </div>
  )
}

export default Input
