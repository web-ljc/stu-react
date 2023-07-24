import React from "react";

class Demo3 extends React.Component {
    box3 = React.createRef() // this.box3 = xxx

    render() {
        return <div>
            <h2 className="title" ref="titleBox">温馨提示</h2>
            <h2 className="title" ref={x => this.box2 = x}>温馨提示</h2>
            <h2 className="title" ref={this.box3}>温馨提示</h2>
        </div>
    }
    componentDidMount() {
        // 第一次渲染完毕【virtualDOM已经变为真实DOM】：我们恶意获取需要操作的DOM元素
        // console.log(this, this.box3);
    }
}

export default Demo3
/*
    受控组件：基于修改数据/状态，让视图更新，达到需要的效果
    非受控组件：基于ref获取DOM元素，操作DOM元素，来实现需求的效果
    基于ref获取DOM元素的语法
        1. 给需要获取的元素设置 ref='xxx'，后期基于this.refs.xxx获取相应的DOM元素【不推荐使用,在严格模式React.strictMode下会报错】
            设置：<h2 className="title" ref="titleBox">温馨提示</h2>
            获取：this.refs.titleBox
            
        2. 把ref属性设置为一个函数
            设置：<h2 className="title" ref={x => this.xxx = x}>温馨提示</h2>
                + x是函数的形参：存储的就是当前DOM元素
                + 把获取的DOM元素x，直接挂在到实例的属性上
            获取：this.xxx
        
        3. 基于React.createRef()方法创建一个ref对象 -- 
            this.xxx = React.createRef() // => {current:null}
            设置：<h2 className="title" ref = {ref对象}>温馨提示</h2>
            获取：this.xxx.current
        
        原理：在render渲染的时候，会获取vituralDOM的ref属性
            + 如果属性值是一个字符串，会给this.refs增加这样一个成员，成员值就是当前的DOM元素
            + 如果属性值是一个函数，会执行函数，把当前DO元素传递给这个函数【x - DOM元素】，而在函数执行的内部，一般会把DOM元素直接挂在实例的某个属性上
            + 如果属性值是一个ref对象，则会把DOM元素赋值给对象的current属性上
*/