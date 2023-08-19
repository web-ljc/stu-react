import React from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import qs from 'qs'

const B = (props) => {
    const location = useLocation()
    // const navigate = useNavigate()
    const {navigate} = props
    const handle = () => {
        // 问号传参
        // navigate('/c', {replace: true})
        // navigate({
        //     pathname: '/c',
        //     // search: '?id=10'
        //     search: qs.stringify({
        //         id: 10
        //     })
        // })

        // 路径传参
        // navigate('/c/100')

        // 隐式传参，页面刷新也存在
        navigate('/c', {
            replace: true,
            // 隐式传参
            state: {
                id: 1000
            }
        })
    }

    return <div className="box">
        B组件内容
        <button onClick={handle}>按钮</button>
    </div>
}

export default B

/*
    在react-router-dom V6中，实现路由跳转的方式
        + <Link/NavLink to='/a'> 点击跳转路由
        + <Navigate to='/a'> 遇到这个组件就会跳转
        + 编程式导航
            import {useNavigate} from 'react-router-dom'
            const navigate = useNavigate()
            navigate('/c')
            navigate('/c', {replace: true})
            navigate({
                pathname: '/c',
                search: '?id=10'
            })
*/

/*
    在react-router-dom V6中，即便当前组件是基于<Route>匹配渲染得，也不会基于属性，把history/location/match传递给组件，
    想获取相关信息，只能基于Hook函数处理
        + 首先要确保需要使用路由Hook的组件，是在Router【HashRouter或BrowserRouter】内部，否则使用这些Hook会报错
        + 只要在<Router>内包裹的组件，不论是否基于<Router>匹配渲染的
            + 默认都不可能再基于props获取相关的对象信息
            + 只能基于路由Hook去获取
    
    为了在类组件中也可以获取路由的相关信息：
        1. 在构建路由表时，继续让基于<Route>匹配渲染的组件，可以基于属性获取需要的信息
        2. 不是基于<Route>匹配渲染的组件，需要自己重写withRouter，让其和基于<Route>匹配渲染的组件，具备相同属性
*/