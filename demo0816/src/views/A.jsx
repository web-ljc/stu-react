import React from 'react'
import { Link, Route, Switch, Redirect } from 'react-router-dom'
import RouterView from '../router'
import aRoutes from '../router/aRoutes'

const A = () => {
    return <div className='box'>
        <div className="menu">
            <Link to="/a/a1">A1</Link>
            <Link to="/a/a2">A2</Link>
            <Link to="/a/a3">A3</Link>
        </div>
        <div>
            {/* 配置二级路由的匹配规则：需要把一级路由地址带上，不能省略 */}
            {/* <Switch>
                <Redirect exact from="/a" to="/a/a1" />
                <Route path="/a/a1" component={A1} />
                <Route path="/a/a2" component={A2} />
                <Route path="/a/a3" component={A3} />
            </Switch> */}
            <RouterView routes={aRoutes} />
        </div>
    </div>
}

export default A