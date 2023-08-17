import React from 'react'
import { HashRouter, Route, Link, Switch, Redirect } from 'react-router-dom'

// 导入组件
import A from './views/A'
import B from './views/B'
import C from './views/C'

const App = () => {
    /*
        基于<HashRouter>把所有要渲染的内容包起来，开启hash路由
            + 后续用到的<Route> <Link>等，都需要在HashRouter/BrowserRouter中使用
            + 开启后，整个页面地址会默认设置一个 #/哈希值
        
        Link实现路由切换/跳转的组件
            + 最后渲染完毕的结果依然是A标签
            + 它可以根据路由模式，自动设定点A切换的方式
    */
    return <HashRouter>
        {/* 导航 */}
        <nav>
            <Link to="/">A</Link>
            <Link to="/b">B</Link>
            <Link to="/c">C</Link>
        </nav>
        {/* 路由容器:每一次页面加载或路由切换完毕，都会根据当前的hash，到这里跟每一个Route匹配，根据匹配内容放到容器中渲染 */}
        <div className="content">
            {/*
                Switch:确保路由中，只要有一项匹配，则不继续向下匹配
                exact: 设置匹配模式为精准匹配
            */}
            <Switch>
                <Route exact path="/" component={A} />
                <Route path="/b" component={B} />
                <Route path="/c" render={() => {
                    // 当路由地址匹配后，先把render函数执行，返回的返回值就是我们需要渲染的内容
                    // 在函数中可以做一些事情，例如：登录校验等
                    let isLogin = true
                    if (isLogin) {
                        return <C />
                    }
                    return <Redirect to="/login" />
                }} />
                {/* 
                    放在最后，path设置为*或不写，意思是：以上都不匹配，则执行这个规则
                    <Route path="*" component={404组件} />
                    重定向到默认/地址
                    <Redirect from="" to="/" exact />
                        - from:从哪个地址来
                        - to：重定向地址
                        - exact是对from地址的修饰，开启精准匹配
                */}
                <Redirect to="/" />
            </Switch>
        </div>
    </HashRouter>
}

export default App

/*
路径地址匹配的规则
    路由地址：Route中path字段制定的地址
    页面地址：浏览器URL后面的哈希值
    非精准匹配
        - 页面地址和路由地址一样
        - 页面地址中包含一套完整的路由地址
    精准匹配：
        - 两个地址只有一模一样

    页面地址  路由地址 非精准匹配 精准匹配
        /       /       true    true
        /       /login  false   false
        /login  /       true    false


*/