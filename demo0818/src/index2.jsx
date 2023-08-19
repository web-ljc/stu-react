import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter, Routes, Route, Navigate} from 'react-router-dom';
import HomeHead from './components/HomeHead';
// 导入需要的组件
import A from './views/A'
import B from './views/B'
import C from './views/C'
import A1 from './views/a/A1'
import A2 from './views/a/A2'
import A3 from './views/a/A3'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
        <HomeHead />
        <div>
            {/*
                所有匹配规则放在Routes中
                    + 路由匹配成功，不再基于component/render控制渲染组件，而是基于element，语法格式是<Component>
                    + 不再需要Switch，默认就是一个匹配成功，不再匹配下面的
                    + 不再需要exact，默认每一项匹配就是精准匹配
                原有Redirect操作，被 <Navigate to="/a" /> 代替
                    + 遇到<Navigate />组件，路由就会跳转，跳转到to指定的路由地址
                    + 设置replace属性，不会新增记录，替换现有记录
                    + to的值可以设置为一个对象，pathname需要跳转地址，search问号传参
                多级路由：不在分散到各个组件中编写，统一写在一起处理
                    + 组件中导入Outlet渲染
            */}
            <Routes>
                <Route path="/" element={<Navigate to="/a" />} />
                <Route path='/a' element={<A />}>
                    <Route path="/a" element={<Navigate to="/a/a1" />} />
                    <Route path='/a/a1' element={<A1 />} />
                    <Route path='/a/a2' element={<A2 />} />
                    <Route path='/a/a3' element={<A3 />} /> 
                </Route>
                <Route path='/b' element={<B />} />
                <Route path='/c/:id?' element={<C />} />
                {/* 如果以上都不匹配，就跳转到404，或首页【传递不同的问号参数信息】 */}
                <Route path="*" repalce={true} element={<Navigate to={{
                    pathname: '/a',
                    search: '?id=404'
                }} />} />
            </Routes>
        </div>
    </HashRouter>
  </React.StrictMode>
);


