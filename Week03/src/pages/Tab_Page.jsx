import {MyTab} from "../components/Tab.jsx"

const ITEMS = [
    {title: 'Home',
    description: 'Welcome to my Portfolio Page', 
    }, 
    {title: "About",
        description: 'Hi, I am Sophie, a product designer and visual designer based in Brooklyn'
    },
    {title: "Play",
        description: 'Some of my work that I have done for fun'
    },
]

const TabPage = () => {
  return (
  <>
    <MyTab items = {ITEMS}/>
  </>
  )
}

export default TabPage