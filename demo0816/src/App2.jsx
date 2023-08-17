import React from 'react'
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

import A from './views/A'
import B from './views/B'
import C from './views/C'

const App = () => {
    return <HashRouter>
        <nav>
            <Link to="/a">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </nav>
        <div className="content">
            <Switch>
                <Redirect exact from="/" to="/a" />
                <Route path="/a" component={A} />
                <Route path="/b" component={B} />
                <Route path="/c" component={C} />
                <Redirect to="/a" />
            </Switch>
        </div>
    </HashRouter>
}

export default App
