import {useState} from 'react'
 
const SearchBar = (props) => {
    const [term, setTerm] = useState('')
    const {onSubmit} = props

    const handleChange = (event) => {
        setTerm(event.target.value)
    }

    const handleFormSubmit = (event) => {
        //prevent default behavior which is to refresh page on form submit
        //need 2 interrupt bc we dont want to lose js env. 
        event.preventDefault()
        //term from state
        onSubmit(term)
    }

  return (
    <div className='p-4'>
        <form onSubmit = {handleFormSubmit}>
            <input
                type='text'
                value={term}
                onChange={handleChange}
                className='w-fit rounded-lg border-2 border-gray-300 bg-white px-3 py-2 text-gray-700 shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'
            />
        </form>
    </div>
  )
}

export default SearchBar