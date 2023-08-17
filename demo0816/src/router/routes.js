/*
    配置路由表：数组中每一项就是每一个需要配置的路由规则
        redirect: 配置重定向
        from: 来源地址
        to: 重定向地址
        exact: 是否精准匹配

        path: 匹配的路径
        component: 渲染的组件
        name: 路由名称
        meta:{} 路由元信息
        children: []子路由
*/

import A from '../views/A'
import B from '../views/B'
import C from '../views/C'
import aRoutes from './aRoutes'

const routes = [
    {
        redirect: true,
        from: '/',
        to: '/a',
        exact: true,
    },
    {
        path: '/a',
        name: 'a',
        component: A,
        meta: {},
        children: aRoutes,
    },
    {
        path: '/b',
        name: 'b',
        component: B,
        meta: {},
        children: [],
    },
    {
        path: '/c',
        name: 'c',
        component: C,
        meta: {},
        children: [],
    },
    {
        redirect: true,
        to: '/a',
    },
]
export default routes