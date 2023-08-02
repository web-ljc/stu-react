import React from 'react'

/*
    React高阶组件：利用js中闭包【柯理化函数】实现的组件代理
        - 可以在代理组件中，经过业务逻辑的处理，获取一些信息，最后基于属性等方案，传递给我们最终要渲染的组件
*/
const Demo = (props) => {
    console.log(props);
    return <div>
        Demo
    </div>
}

// 执行ProxyType方法，传递一个组件进来【Component】
const ProxyType = (Component) => {
    return (props) => {
        // console.log(props); // {x: 10, y: 20, ...}
        // 将属性传递给组件
        return <Component {...props} />
    }
}

export default ProxyType(Demo)
// 当前案例，导出的是HOC:height-order-components