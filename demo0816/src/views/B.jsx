import React from 'react'
import {useHistory, useLocation, useRouteMatch} from 'react-router-dom'
import qs from 'qs'

const B = (props) => {
    let history = useHistory(),
        location = useLocation(),
        match = useRouteMatch()
    return <div className='box'>
        B组件内容
        <button onClick={() => {
            // 传参1: 问号传参，不安全，长度限制
            // history.push('/c?id=10')
            // history.push({
            //     pathname: '/c',
            //     // search存储的就是问号传参信息，要求是urlencoded字符串
            //     // search: 'id=10'
            //     search: qs.stringify({
            //         id: 10,
            //         name: 'test'
            //     })
            // })
            // 传参2: 路径参数【把需要传递的值，作为路由路径中的一部分】
            // history.push('/c/10/test')
            // 传参3: 隐式传参，安全、没限制、刷新地址丢失
            history.push({
                pathname: '/c',
                state: {
                    id: 100,
                    name: 'test'
                }
            })
        }}>按钮</button>
    </div>
}

export default B