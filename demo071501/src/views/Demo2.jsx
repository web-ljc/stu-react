import React from "react";

class Demo2 extends React.Component {
    state = {
        arr: [10, 20, 30] // arr指向堆内存的地址001
    }
    render() {
        let {arr} = this.state // arr -- 001
        return <div>
            {
                arr.map((item, index) => {
                    return <span key ={index} style={{
                        display: "inline-block",
                        width: '100px',
                        height: '100px',
                        background: 'pink',
                        marginRight: '10px'
                    }}>
                        {item}
                    </span>
                })
            }
            <br />
            <button onClick={() => {
                arr.push(40)  // 给001堆中添加一个40
                // 无法更新
                // this.setState({ arr }) // 最新修改的状态地址还是001
                // this.forceUpdate() // 跳过默认加载的shouldComponentUpdate，直接更新

                this.setState({
                    arr: [...arr] // 让arr状态值改为一个新的数组【堆地址】
                })
            }}>add span</button>
        </div>
    }
    // 将要更新
    shouldComponentUpdate(nextProps, nextState) {
        const {state, props} = this
        return !shallowEqual(state, nextState) || !shallowEqual(props, nextProps)
    }
}

export default Demo2

/*
    PureComponent 和 Component的区别：
        PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
        + 在此周期函数中，它对新老的属性/状态，会做一个浅比较
        + 如果浅比较，发现属性和状态并没有改变，则返回false，不继续更新组件

    浅比较：只比较对象的第一级，对于深层次内容，不会再进行比较
        1先比较对象成员的数量，如果数量不一致，那么2个对象肯定不一致
        2对象引用，对比的是对象的堆地址，如果地址不同，内容相同也是不一样的
*/

// 检测是否为对象
const isObject = function isObject(obj) {
    return obj !== null && /^(object|function)$/.test(typeof obj)
}
// 对象浅比较
const shallowEqual = function shallowEqual(objA, objB) {
    if (!isObject(objA) || !isObject(objB)) return false
    if (objA === objB) return true
    // 比较成员数量
    const keysA = Reflect.ownKeys(objA),
        keysB = Reflect.ownKeys(objB)
    if (keysA.length !== keysB.length) return false
    // 数量一致比较成员
    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i]
        if (!objB.hasOwnProperty(key) || !Object.is(objA[key], objB[key])) {
            return false;  
        }
    }
    // 以上都处理完，发现没有不相同的成员，则认为2对象相等
    return true
}

shallowEqual({
    x: 1,
    y: 2
}, {
    x: 1,
    y: 2,
})