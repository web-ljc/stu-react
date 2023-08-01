import React, { useState, useMemo, useCallback } from "react";

/*
    
*/
let prev;
const Vote = (props) => {
    const [num, setNum] = useState(10)

    // 函数第一次创建0x001，第二次更新：0x1001
    /*
        const xxx = useCallback(callback, [dependencies])
            + 第一次渲染，useCallback执行，创建一个函数“callback”，赋值给xxx
            + 组件后续每一次更新，判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给xxx，但是如果依赖的状态没有更新[或没有设置依赖]则xxx获取的一直是第一次创建的函数堆，不会创建新的函数出来
            + 或者说，基于useCallback，可以始终获取第一次创建函数的堆内存地址
        - 不能乱用，虽然减少了堆内存的开辟，但useCallback本身也有自己的处理逻辑和缓存机制，也消耗时间
        - 场景：父组件嵌套子组件，父组件要把一个内部的函数，基于属性传递给子组件，此时传递的这个方法，基于useCallback处理会更好，这样传递的函数都是第一个地址，优化子组件渲染

    */
    const handle = useCallback((a) => {
        console.log(a);
    }, [])

    // if(!prev) {
    //     prev = handle
    // } else {
    //     console.log(handle === prev);
    // }
    
    return (
        <div>
            <Child handle={handle} />
            <Child2 handle={handle} />
            <div className="header">
                <span>{num}</span>
            </div>

            <div className="footer">
                <button onClick={() => {setNum(num + 1)}}>
                    add
                </button>
            </div>
        </div>
    )
}

// 当父组件更新时，因为传递给子组件的属性仅仅是一个函数，所以不想让子组件也跟着更新
//  1. 传递给子组件的属性，每一次都需要是相同的堆内存地址，基于useCallback处理
//  2. 在子组件内部也要做一个处理，验证父组件传递的属性是否发生改变，
//       - 类组件：可以继承PureComponent即可【shouldComponentUpdate中对于新老属性做了浅比较】，如果没有变化，则让子组件不能更新。
//       - 函数组件：基于React.memo函数，对新老传递的属性做比较，如果不一致，才会执行函数。
class Child extends React.PureComponent {
    render() {
        console.log('child render', this.props.handle);
        return <div>
            子组件
        </div>
    }
}

const Child2 = React.memo(() => {
    console.log('render2');
    return <div>
        子组件2
    </div>
})

export default Vote