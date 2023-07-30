import React, { useState } from "react";
import {flushSync} from 'react-dom'

/*
    useState自带了性能优化的机制：
        + 每一次修改状态值的时候，会拿最新要修改的值和之前的状态值做比较【基于Object.is作比较】
        + 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新【可理解为：类似于PureComponent，在shouldComponentUpdate中做了浅比较和优化】
    
*/

const Demo = () => {
    let [x, setX] = useState(10)

    console.log('render渲染');

    const handle = () => {
        for (let i = 0; i < 10; i++) {
            // flushSync(() => {
            //     setX(x + 1) // 渲染2次，值为11
            // })
            setX(prev => {
                // prev存储上一次的状态值
                console.log(prev);
                return prev + 1; // 返回的信息是我们要修改的状态值
            })            
        }
        // setX(10)
    }

    return (
        <div>
            <p>x: {x}</p>
            <button onClick={handle}>
                add
            </button>
        </div>
    )
}

export default Demo