const FILTERS = ['all', 'active', 'done']

const TodoFilter = (props) => {
  // this component does NOT own the filter. App does, because the list needs
  // to know it too. We just show the buttons and report clicks back up.
  const {filter, onChange} = props

  const renderedButtons = FILTERS.map((name) => {
    // the selected button is filled in, the others are plain
    const isSelected = name === filter
    
    return (
      <button
        key={name}
        onClick={() => onChange(name)}
        //is the toggle selected true? if yes then make it blue and if not use a unselected state
        className={isSelected ? 'bg-blue-900 text-white px-3 py-1 rounded': 'border border-gray-300 px-3 py-1 rounded'}
      >
        {name}
      </button>
    )
  })

  return <div className="flex gap-2 mb-4 text-sm">{renderedButtons}</div>
}

export default TodoFilter
