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
            // 传参2:
            history.push({
                pathname: '/c',
                // search存储的就是问号传参信息，要求是urlencoded字符串
                // search: 'id=10'
                search: qs.stringify({
                    id: 10,
                    name: 'test'
                })
            })
        }}>按钮</button>
    </div>
}

export default B