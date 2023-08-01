import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

/*
    -
    - 基于“ref={() => {}}”的方式，可以把创建的DOM元素（或者子组件的实例）赋值给box变量。【不推荐】
    - 基于 React.createRef 创建ref对象来获取想要的内容
    - 函数组件中，可以基于 useRef Hook函数，创建一个ref对象
        - useRef只能在函数组件中使用【所有的ReactHook函数，都只能在函数组件中使用，在类组件中使用会报错】
        - React.createRef 也是创建ref对象，可以在类组件使用，也可以在函数组件中使用
        - useRef在每一次组件更新的时候，再次执行useRef方法的时候，不会创建新的REF对象，获取到的还是第一次创建的REF对象
        - React.createRef在每一次组件更新的时候，都会创建一个全新的Ref对象，浪费性能
    - 在类组件中，创建REF对象，我们基于React.createRef处理，但是在函数组件中，为了保证性能，应该使用专属useRef处理。
*/

let prev1,
    prev2;
const Demo = () => {
    const [num, setNum] = useState(0)

    // 基于“ref={() => {}}”的方式，可以吧创建的DOM元素（或者子组件的实例）赋值给box变量。【不推荐】
    // let box;
    // 基于 React.createRef 创建ref对象来获取想要的内容
    // let box = React.createRef()
    
    // 函数组件中，可以基于 useRef Hook函数，创建一个ref对象
    let box1 = useRef(null)
    let box2 = React.createRef()

    if (!prev1) {
        // 第一次DEMO执行，把第一次创建的REF对象赋值给变量
        prev1 = box1
        prev2 = box2
    } else {
        // 第二次DEMO执行，新创建的REF对象是否和之前创建的一致？
        console.log(prev1 === box1); // true useRef在每一次组件更新的时候，再次执行useRef方法的时候，不会创建新的REF对象，获取到的还是第一次创建的REF对象
        console.log(prev2 === box2); // false createRef在每一次组件更新的时候，都会创建一个全新的Ref对象，浪费性能
        console.log(prev1, box1.current);
        console.log(prev2, box2.current);
        // 总结：在类组件中，创建REF对象，我们基于React.createRef处理，但是在函数组件中，为了保证性能，应该使用专属useRef处理。
    }

    useEffect(() => {
        console.log(box1.current);
        console.log(box2.current);
    })

    return (
        <div className="demo">
            {/* <p ref={x => box = x}>{num}</p> */}
            <p ref={box1}>{num}</p>
            <p ref={box2}>hahhaha</p>
            <button onClick={() => setNum(num+1)}>
                add
            </button>
        </div>
    )
}

export default Demo