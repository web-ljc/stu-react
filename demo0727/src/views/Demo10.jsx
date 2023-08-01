import React, { useEffect, useRef, useState, useImperativeHandle } from "react";

// 基于ref获取子组件的实例，这样基于实例，可以调用子组件内部，挂载到实例上的东西
// class Child extends React.Component {
//     state = {
//         x: 1000
//     }
//     render() {
//         return <div className="child-box">
//             {this.state.x}
//         </div>
//     }
// }

// 基于forwardRef实现ref转发，目的：获取子组件内部的某个元素
// const Child = React.forwardRef((props, ref) => {
//     return <div>
//         <span ref={ref}>hahhaha</span>
//     </div>
// })

// 函数组件内部，可以有状态和方法。如何实现：基于forwardRef实现ref转发的同时，获取子组件内部的状态或方法？useImperativeHandle
const Child = React.forwardRef((props, ref) => {
    const [text, setText] = useState('你好')
    const handle = () => {}
    useImperativeHandle(ref, () => {
        // 返回的内容，都会被父组件的REF对象获取到
        return {
            text,
            handle
        }
    })
    return <div>
        <span>hahhaha</span>
    </div>
})

const Demo = () => {
    const [num, setNum] = useState(0)
    let box1 = useRef(null)

    useEffect(() => {
        console.log(box1.current);
    })

    return (
        <div className="demo">
            <Child ref={box1}>
                {num}
            </Child>
        </div>
    )
}

export default Demo