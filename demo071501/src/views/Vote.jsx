/**
 * 类组件是-动态组件
 *  创建一个构造函数（类）
 *      + 求必须继承React.Component/PureComponent这个类
 *      + 习惯使用ES6中的class创建类
 *      + 必须给当前类设置一个render方法【放在原型上】，在render方法中，返回需要渲染的视图
*/
import React, { Component } from "react"
class Vote extends Component {
    state = {
        supNum: 10,
        oppNum: 5
    }

    render() {
        const {supNum, oppNum} = this.state
        return <div className="vote-box">
            <div className="header">
                <h2 className="title">
                    {'title'}
                </h2>
                <span>{supNum + oppNum}</span>
            </div>
            <div className="main">
                <p>agree: {supNum}</p>
                <p>reject: {oppNum}</p>
            </div>
            <div className="footer">
                <button onClick={() => {supNum++; console.log(supNum);}}>agree</button>
                <button onClick={() => {oppNum++}}>reject</button>
            </div>
        </div>
    }
}

// 基于ES5的方式实现继承；寄生组合式继承
function AA() {
    React.Component.call(this)
    this.state = {}
}
Object.setPrototypeOf(AA.prototype, React.Component.prototype)
AA.prototype.sum = function(){}

export default Vote