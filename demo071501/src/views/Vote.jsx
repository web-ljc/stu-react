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

class Parent {
    // new的时候，执行构造函数，可写可不写：需要接收传递过来的实参信息，才需要设置constructor
    constructor(x, y) {
        // this指向实例
        this.total = x + y
    }
    num = 200; // 等价于 this.num = 200 给实例添加的私有属性
    getNum = () => {
        console.log(this); // this指向创建的实例
    }
    // =====将方法挂到原型上
    sum() {
        // 类似于 sum = function sum() {} 不是箭头函数
        // 给Parent.prototype上设置公共方法，且不可枚举
    }
    // =====将方法、属性挂到构造函数上
    static average() {} // 把构造函数当作一个普通对象，为其设置静态的私有属性方法
    static y = 200 // 加到构造函数上了
}
Parent.prototype.z = 100 // 在外部给构造函数原型上设置公共的属性
let p = new Parent(10, 20)
p.getNum()

/**
 * 基于extends实现继承
 * 1.首先基于call继承 React.Component.call(this) // this -- Child类的实例c
 *   function Component(props, context, updater) {
 *          this.props = props;
 *          this.context = context
 *          this.ref = emptyObject
 *          this.updater = updater || ReactNoopUpdateQueue
 *   }
 *   给创建的实例c设置四个私有属性props/context/refs/updater
 * 2. 再基于原型继承 Parent.prototype.__propto__ === React.component.prototype
 *      实例 -> Parent.proptotype -> React.component.prototype -> Object.prototype
 *      实例除了具备Parent.prototype提供的方法之外，还具备了React.Component.prototype原型上提供的方法：isReactComponent\setState\forceUpdate
 * 
 * 3. 只要设置了constructor，则内部第一句话一定要执行super()

*/
class Child extends React.Component {
    constructor(props) {
        // this -> c
        // super() // 等价于 React.Component.call(this) 
        // this.props=undefined   this.context=undefined   this.refs={}
        super(props) // 等价于 React.Component.call(this) 
        // this.props = props
    }
    x = 100
    getX () {}
}
const c = new Child({x: 10}, 20)
console.log(c);

export default Vote