import { lazy } from 'react'
import {Navigate} from 'react-router-dom'
import A from '../views/A'

// 二级路由
const aRoutes = [{
    path: '/a',
    component: () => <Navigate to="/a/a1" />
}, {
    path: '/a/a1',
    name: 'a-a1',
    component: lazy(() => import(/* webpackChunkName:"aChild"*/'../views/a/A1')),
    meta: {},
}, {
    path: '/a/a2',
    name: 'a-a2',
    component: lazy(() => import(/* webpackChunkName:"aChild"*/'../views/a/A2')),
    meta: {},
}, {
    path: '/a/a3',
    name: 'a-a3',
    component: lazy(() => import(/* webpackChunkName:"aChild"*/'../views/a/A3')),
    meta: {},
}]

// 一级路由
const routes = [{
    path: '/',
    component: () => <Navigate to="/a" />
}, {
    path: '/a',
    name: 'a',
    component: A,
    meta: {},
    children: aRoutes
}, {
    path: '/b',
    name: 'b',
    component: lazy(() => import('../views/B')),
    meta: {},
}, {
    path: '/c/:id?',
    name: 'c',
    component: lazy(() => import('../views/C')),
    meta: {},
}, {
    path: '*',
    component: () => {
        return <Navigate to={{
            pathname: '/a',
            search: '?id=404'
        }}/>
    }
}]


export default routes