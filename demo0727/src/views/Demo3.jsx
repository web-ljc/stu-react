import React, { useState } from "react";
import {flushSync} from 'react-dom'

/*
    在React18中，我们基于useState创建出来的“修改状态的方法”，他们的执行也是异步的
    原理：等同于类组件中的this.setState，基于异步操作 & 更新队列，实现状态的批处理
      在任何地方修改状态，都是采用异步编程的
*/

const Demo = () => {
    let [x, setX] = useState(10)
    let [y, setY] = useState(20)
    let [z, setZ] = useState(30)

    console.log('render渲染');

    const handle = () => {
        flushSync(() => {
            setX(x + 1)
            setY(y + 1)
        })
        setZ(z + 1)
    }

    return (
        <div>
            <p>x: {x}</p>
            <p>y: {y}</p>
            <p>z: {z}</p>
            <button onClick={handle}>
                add
            </button>
        </div>
    )
}

export default Demo