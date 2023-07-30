import React, { useState } from "react";

/*
    函数组件的每一次渲染（或更新），都是函数重新执行，产生一个全新的“私有上下文”
        + 内部的代码也需要重新执行
        + 涉及的函数需要重新的构建【这些函数的作用域（函数执行的上级上下文），是每一次执行DEMO产生的闭包】
        + 每一次执行DEMO函数，也会把useState重新执行，但是：
            + 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值【而不是初始值】
            + 返回的修改状态的方法，每一次都是返回一个新的
        var _state;
        function useState(initialValue) {
            if (typeof _state === 'undefined') _state = initialValue
            var setState = function setState(value) {
                _state = value
                // 通知视图更新
            }
            return [_state, setState]
        }
        let [num1, setNum] = useState(0)
*/

const Demo = () => {
    let [num, setNum] = useState(0)
    const handle = () => {
        // n+=10
        // console.log(n);
        num+=100
        setNum(num)
        setTimeout(() => { // 注意：变量num查找，在私有上下文中查找
            console.log(num);
        }, 2000)
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