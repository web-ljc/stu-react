import React from 'react'
import { useLocation, useRouteMatch, useParams } from 'react-router-dom'
import qs from 'qs'

const C = () => {
    const location = useLocation()
    // 获取传递的问号参数信息
    let {id, name} = qs.parse(location.search.substring(1))
    // 基于URLSearchParams来处理
    // 也存在安全和长度的限制
    let usp = new URLSearchParams(location.search)
    console.log(usp.get('id'));

    // 获取路路径参数数据
    const match = useRouteMatch()
    console.log(match.params); //{id: '10', name: 'test'}
    const params = useParams()
    console.log(params); //{id: '10', name: 'test'}

    // 获取隐式传参
    console.log(location, location.state);

    return <div className='box'>
        C组件内容
    </div>
}

export default C