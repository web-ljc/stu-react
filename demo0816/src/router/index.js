import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

/* 调用组件时，基于属性传递路由表进来，根据路由表，动态设定路由的匹配规则 */
const RouterView = (props) => {
    return <Switch>
        {
            props.routes.map((item, index) => {
                const {redirect, from, to, exact, path, component: Component, name, meta, children} = item
                let config = {}

                if (redirect) {
                    config = { to, exact, from }
                    return <Redirect key={index} {...config} />
                }
                config = { path, exact }
                return <Route key={index} {...config} render={() => {
                    return <Component />
                }} />
            })
        }
    </Switch>
}

export default RouterView