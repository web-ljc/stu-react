/**
 * 类组件是-动态组件
 *  创建一个构造函数（类）
 *      + 求必须继承React.Component/PureComponent这个类
 *      + 习惯使用ES6中的class创建类
 *      + 必须给当前类设置一个render方法【放在原型上】，在render方法中，返回需要渲染的视图
 * 
 * 从调用类组件 new Vote() 开始，类组件内部发生的事情：
 *  1. 初始化属性
 *      先校验规则，校验完毕后，在处理属性的其它操作
 *      方案一
        constructor(props) {
            super(props) // 把传递进来的属性挂载到this实例上
        }
*       方案二：即便我们不在constructor中处理，在constructor处理完毕后，React内部也会把传递的props挂载到实例上，
            所以在其它的函数中，只要保证this是实例，就可以基于this.props获取传递的属性
*           + 同样this.props获取的属性对象也是被冻结的 Object.isFrozen(this.props)
*   规则校验
*       static defaultProps={}
*       static propType={}
*
*   2. 初始化状态
*       状态：后期修改状态，可以触发视图的更新
            需要手动初始化，如果我们没有做相关处理，则会默认往实例上挂载一个state，初始值为null  this.state=null
            state = {
                ...
            }
        修改状态，控制视图更新
            this.state.xx = xxx，这种操作仅仅是修改了状态值，但是无法让视图更新
            想让视图更新，需要基于React.Component.prototype提供的方法操作：
                1. this.setState(partialState) 即可以修改状态，也可以视图更新
                    partialState: 部分状态
                    this.setState({xxx: xxx})
                2. this.forceUpdate() 强制更新
    
    3. 触发 componentWillMount 周期函数（钩子函数）：组件第一次渲染之前
        钩子函数：在程序运行到某个阶段，可以基于提供一个处理函数，让开发者在这一阶段做一些自定义的事情
        + 此周期函数是不安全的，【虽然可以用，未来可能被移除，所以不建议使用】
            + 控制会抛出黄色警告[为了不抛警告，可以暂时使用UNSAFE_componentWillMount]
        + 如果开启了React.StrictMode[React的严格模式]，则我们使用UNSAFE_componentWillMount，这样的周期函数，控制台会直接抛出红色警告错误
            + React.StrictMode / "use strict"
            + "use strict":JS的严格模式
            + React.StrictMode:React的严格模式，会检查React中一些不规范的语法、或者是不建议使用的API
    
    4. 触发 render 周期函数：渲染

    5. 触发 componentDidMount 周期函数：第一次渲染完毕
        + 已经吧virtualDOM变为真实DOM【可以获取真实DOM】
*
*/
import React, { Component } from "react"
import PropTypes from "prop-types"
class Vote extends Component {
    // 属性规则校验
    static defaultProps = {
        num: 0
    }
    static propType = {
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props)
        console.log(this, 2);
    }

    // 初始化状态
    state = {
        supNum: 10,
        oppNum: 5
    }

    UNSAFE_componentWillMount() {
        console.log('componentWillMount 第一次渲染之前');
    }
    
    componentDidMount() {
        console.log('componentDidMount 第一次渲染完毕');
    }

    render() {
        console.log('render 渲染');
        const {title} = this.props,
            {supNum, oppNum} = this.state
        return <div className="vote-box">
            <div className="header">
                <h2 className="title">
                    {title}
                </h2>
                <span>{supNum + oppNum}</span>
            </div>
            <div className="main">
                <p>agree: {supNum}</p>
                <p>reject: {oppNum}</p>
            </div>
            <div className="footer">
                <button onClick={() => this.setState({supNum: supNum+1})}>agree</button>
                <button onClick={() => {this.state.oppNum++; this.forceUpdate()}}>reject</button>
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
        // console.log(this); // this指向创建的实例
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
        // super() // 等价于 React.Component.call(this) 但没传参
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