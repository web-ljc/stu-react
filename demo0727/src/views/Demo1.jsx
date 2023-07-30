import React, { useState } from "react";

/*
    useState： 在函数组件中使用状态，并且后期基于状态的修改，可以让组件更新
        let [num, setNum] = useState(initialValue)
            - 执行useState,传递的initialValue是初始的状态值
            - 执行这个方法，返回结果是一个数组：[状态值，修改状态的方法]
                + num变量存储的是获取的状态值
                + setNum变量存储的是：修改状态的方法
            - 执行 setNum(val)
                + 修改状态值改为val
                + 通知视图更新
    函数组件【Hooks组件】不是类组件，所以没有实例的概念【调用组件不再是创建类的实例，而是把函数执行，产生一个私有上下文】，函数组件中不涉及this的处理

*/
const Demo = () => {
    let [num, setNum] = useState(0)
    const handle = () => {
        // n+=10
        // console.log(n);
        setNum(num+10)
    }
    return (
        <div>
            <p>{num}</p>
            <button onClick={handle}>
                add
            </button>
        </div>
    )
}

export default Demo