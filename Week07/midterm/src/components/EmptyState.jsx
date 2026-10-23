// the shaded "nothing here" box. Same look everywhere
const EmptyState = (props) => {
  const {message} = props

  return (
    <div className="flex px-4 py-6 bg-gray-100 rounded-lg mb-4 mt-4">
      <p className="text-gray-500">{message}</p>
    </div>
  )
}

export default EmptyState
