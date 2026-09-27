import Panel from './Panel.jsx'
import {Link} from 'react-router-dom'

const NavBar = () => {

    // can practice using mapping
    return <Panel>
        <div className="mt-8 px-3">
            <Link to='/' className = 'text-blue-500'>Buttons</Link>
        </div>

        <div className="mt-8 px-3">
            <Link to='/accordion' className = 'text-blue-500'>Accordion</Link>
        </div>

        <div className="mt-8 px-3">
            <Link to='/dropdown' className = 'text-blue-500'>Dropdown</Link>
        </div>

        <div className="mt-8 px-3">
            <Link to='/carousel' className = 'text-blue-500'>Carousel</Link>
        </div>
     </Panel>
}

export default NavBar