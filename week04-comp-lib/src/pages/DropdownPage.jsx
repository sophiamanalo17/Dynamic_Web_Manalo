import {useState} from 'react'
import Dropdown from '../components/Dropdown'

//data lives in parent not aomic ocmponent or it will always be there when used
const OPTIONS = [
  {label: 'Red', value: 'red'},
  {label: 'Green', value: 'green'},
  {label: 'Blue', value: 'blue'},
]

// Tailwind scans your source for complete class strings, so
// `bg-${value}-500` will NOT work. Map them out explicitly instead.
const COLOR_MAP = {
  red: 'bg-red-500',
  green: 'bg-green-400',
  blue: 'bg-blue-500',
}

//apply a classname based on selected value
//COLOR_MAP[{value.value}]


const DropdownPage = () => {
    const [value, setValue] = useState(null)

    const handleChange = (option) => {
        setValue(option)
    }

    return (
    <div>
        {/* value?.label means if value exists,, render the label otherwise exit */}
        <h1 className = {COLOR_MAP[value?.value] || undefined}>Dropdown Page with user selected value of {value?.label}</h1>
        {/* parent element of any form element passes down onChange handler and value prop linked to state */}
      <Dropdown options={OPTIONS} onChange={handleChange} value={value}/>
    </div>
  )
}


export default DropdownPage