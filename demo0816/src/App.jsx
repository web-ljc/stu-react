import React from 'react'
import { HashRouter, Link } from 'react-router-dom'
import RouterView from './router'
import routes from './router/routes'
import HomeHead from './components/HomeHead'

const App = () => {
    return <HashRouter>
        <HomeHead />
        <div className="content">
            <RouterView routes={routes} />
        </div>
    </HashRouter>
}

export default App
