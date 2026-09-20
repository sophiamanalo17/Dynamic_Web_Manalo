import {useState} from 'react'

export const MyTab = (props) => {
   const {items} = props

    //because one must be selected
    //variable and the function (function setActiveIndex use with handler and active in the rendering)
    const [activeIndex, setActiveIndex] = useState(0)

    //handle click is the function when comeone calls onClick
    //defining what the next index is saying nextIndex = index clicked
    const handleClick = (nextIndex) => {
        setActiveIndex(nextIndex)
    }

    //all the tab titles in one row
    //passing in items from Tabs_Page
    const renderedTabs = items.map((item, index) => {
        return (
            //renders all buttons
            <button
                //use index bc titles could be the same and dont want the same key 
                key = {item.index}
                //checks which button is clicked and makes it the activeIndex
                onClick = {() => handleClick(index)}
                style = {{fontWeight: index === activeIndex ? 'bold' : 'normal'}}
            >
                {item.title}
            </button>
        )
    })

  return (
    <div>
        <div>{renderedTabs}</div>
        {/* only show the description of the active tab */}
        <div className = "border--b"> {items[activeIndex].description} </div>
    </div>
  )
}

export default MyTab
