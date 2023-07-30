import React, { useState } from "react";
import {flushSync} from 'react-dom'

/*
    useState自带了性能优化的机制：
        + 每一次修改状态值的时候，会拿最新要修改的值和之前的状态值做比较【基于Object.is作比较】
        + 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新【可理解为：类似于PureComponent，在shouldComponentUpdate中做了浅比较和优化】
    
*/

const Demo = (props) => {
    // 我们需要把基于属性传递进来的x/y，经过其他处理的结果作为初始值
    // 需要对初始值的操作，进行惰性处理，只有第一次渲染组件处理这些逻辑，以后组件更新，这样的逻辑就不再运行
    let [num, setNum] = useState(() => {
        const {x, y} = props
        let total = 0
        for (let i = x; i <=y; i++) {
            total += +String(Math.random()).substring(2)
        }
    })
    

    const handle = () => {
        setNum(1000)
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