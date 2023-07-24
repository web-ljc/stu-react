import React from "react";

class Child1 extends React.Component {
    state = {
        name: 'child1'
    }
    render() {
        return <div>
            子组件1
        </div>
    }
}

const Child2 = function Child2 () {
    return <div>
        子组件2
    </div>
}

const Child3 = React.forwardRef(function Child3 (props, ref) {
    // console.log(ref); // ref是调用Child3时，设置的ref属性值【函数】
    // x => this.child3 = x
    return <div>
        子组件2
        <button ref={ref}>按钮</button>
    </div>
})

class Demo4 extends React.Component {
    child3 = React.createRef()

    render() {
        return <div>
            <Child1 ref={x => this.child1 = x} />
            <Child2 />
            {/* <Child3 ref={this.child3} /> */}
            <Child3 ref={x => this.child4 = x} />
        </div>
    }
    componentDidMount() {
        // console.log(this.child1); // 存储的是：子组件的实例对象
        console.log(this.child3); // 存储的是：子组件内部的button按钮
    }
}

export default Demo4


/*
    给元素标签设置ref， 目的：获取对应的DOM元素
    给类组件设置ref，目的：获取当前调用组件创建的实例，【后续可以根据实例获取子组件中的相关信息】
    给函数组件设置ref，直接报错Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
        + 但是我们可以配合 React.forwardRef 实现ref转发
        + 目的：获取函数子组件内部的某个元素
*/