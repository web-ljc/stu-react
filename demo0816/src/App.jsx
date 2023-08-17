import React from 'react'
import { HashRouter, Link } from 'react-router-dom'
import RouterView from './router'
import routes from './router/routes'

const App = () => {
    return <HashRouter>
        <nav>
            <Link to="/a">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </nav>
        <div className="content">
            <RouterView routes={routes} />
        </div>
    </HashRouter>
}

export default App
