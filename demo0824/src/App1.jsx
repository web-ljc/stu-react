
import {HashRouter, Switch, Route, Link, Redirect} from 'react-router-dom'
import {dynamic} from './utils'

const LazyHome = dynamic(() => import(/*webpackPrefetch:true*/'./views/Home'))
const LazyUser = dynamic(() => import(/*webpackPrefetch:true*/'./views/User'))

const App1 = () => {
    return <HashRouter>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/User">User</Link></li>
        </ul>
        <Switch>
            <Route exact={true} path='/' component={LazyHome} />
            <Route path='/User' component={LazyUser} />
            <Redirect to='/' />
        </Switch>
    </HashRouter>
}

export default App1
