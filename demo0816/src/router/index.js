import React, {Suspense} from 'react'
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
                return <Route key={index} {...config} render={(props) => {
                    // console.log(props);
                    // 路由懒加载，必须Suspense支持
                    return <Suspense fallback={<>正在处理中...</>}>
                        <Component {...props} />
                    </Suspense>
                }} />
            })
        }
    </Switch>
}

export default RouterView