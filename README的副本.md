## 什么是JSX
  - 一种将JS和XML混合的语法，将组件的结构、数据、样式都聚合在一起定义组件
  - jsx 是react提供的一个语法糖 React.createElement()
    ```js
      // 2种书写方法是一样的
      // JSX写法
      let element = <h1>hi</h1>
      // React.createELement()写法
      // jsx在执行的时候其实是一个函数调用，他是一个创建元素的工厂函数
      let element = React.createElement('h1', null, 'hi')
    ```
  - JSX表达式：可以计算，肯定会有一个返回值

## 虚拟DOM（概念题）
- 是什么？
    - React元素是构建React应用的最小单位，也就是所谓的虚拟DOM
    - `React.createElement`函数锁返回的就是一个虚拟DOM
    - 虚拟DOM就是一个描述真实DOM的JS对象
- 能干什么？
    - 处理了浏览器兼容问题，避免用户操作真实DOM
    - 内容经过XSS处理，防范XSS攻击
    - 容易实现跨平台开发Android、IOS应用
    - 更新的时候可以实现差异化更新，减少DOM操作
- 如何干的？
- 干的怎么样？
    - 虚拟DOM需要消耗额外的内存
    - 首次渲染并不一定快

  - 保证了最低性能，可以跨平台
    ```js
      jsx element = {
        "type": "h1", // 元素类型
        "key": null, // 区分同一级不同元素
        "ref": null, // 用来获取真实DOM元素
        "props": { // 属性
          "id": "title"
          "children": "hi"
        },
      }
    ```

## 组件 & props
  - 可以将UI切分成一些独立的、可复用的部件
  - 组件从概念上类似于js函数，接受任意的入参，并返回用于展示内容的React元素
  - 组件分为内置原生组件和自定义组件
    - 内置组件   p h1 span div 字符串
    - 自定义组件 类型是一个函数, 类组件的父类Component的原型上有一个属性isReactComponent={}
    - 自定义组件的名称必须首字母大写
    - 自定义组件的返回值有且只能一个根元素
  
  ### 函数组件
  ### 类组件

## 状态
  - 类组件的数据来源有2个地方： 父组件传过来的属性， 组件内部的状态
  - 属性和状态发生变化后组件都会更新，试图都会渲染
  - 定义状态的2种方法
    - 构造函数中定义
    - 直接属性赋值
  
  - setState可以更改状态，让组件刷新
    - state的更新可能是异步，都会批量执行
      this.setState({}, () => {}) // 对象，回调函数
      this.setState((state,props)=>{}, ()=>{}) // 函数 上一次state， 回调函数
    - 出于性能考虑React可能会把多个setState合并成一个调用，本质是批量执行
    - 原理：判断是否批量还是同步，如果批量处理将setState方法存到到栈中统一处理，同步直接处理。
    - 如何判断是同步还是异步？
      - React能管控的地方，批量的，异步的，事件处理函数 / 声明周期函数
      - 不能管控的地方就，非批量，同步的， setInterval / setTimeout / 原生DOM事件
    - 注意在 legacy 模式下可以同步，在 concurrent 模式下setState的更新统一是异步的

## 事件
  - React事件命名采用小驼峰式  camelCase onClick
  - 原生事件里传函数名字符串，在React传一个函数的引用地址，真实的函数定义
  - 事件委托，React17之前委托到document上。 React17之后会被委托到容器上
  - 给dom添加store属性，用来绑定事件。并给document添加相应的事件，触发事件时执行事件冒泡，对状态或属性队列进行批量处理，更行isBatchingUpdate状态
  - 事件绑定方法
    ```js
      // 方法
      handleClick = (id, event) => console.log(id)

      // jsx 想事件处理程序传递参数，通过箭头函数或绑定事件
      <button onCLick={(event) => this.handleClick(1, event)}> click </button>
      <button onCLick={this.handleClick.bind(this, 1)}> click </button>
      
    ```

## Ref
  - Refs提供了一种方式，允许我们访问真实DOM节点或在render方法中创建React元素
  - 在React渲染生命周期时，表单元素上的value会覆盖DOM节点中的值，在非受控组件，希望React能赋予组件一个初始值，但不去控制后续更新，可以指定一个defaultValue属性，不是value
  ### 为DOM元素添加ref
    - 可是使用ref存储DOM节点的引用
    - 当ref属性用于HTML元素时，构造函数中使用React.createRef()创建的ref接受底层DOM元素作为其current属性
    ```js
      // class组件使用
      const ref1 = React.createRef()
      <input type="text" ref={this.ref1}>

      // 源码
      let createRef = () => { current: null }
      // 渲染成真实DOM时，ref.current 属性指向真实DOM
      if(ref) ref.current = dom

    ```
  ### 为class组件添加ref
    - 生成真实DOM时，给类的ref属性绑定组件的实例
    - 父组件调用子组件方法
    ```js
      sonRef = React.careateRef()
      // 调用子组件的方法
      getSonData = () => {
        this.sonRef.current.getData()
      }

      <TextInput ref={sonRef}>
    ```
    - 子组件调用父组件方法，可以通过属性传递
  ### ref转发
    - 不能在函数组件上使用ref属性，因为它们没有实例
    - Ref转发是一项将ref自动的通过组件传递到其一子组件的技巧
    - Ref转发允许某些组件接收ref，并将其向下传递给子组件
    ```js
      // 子组件
      function TextInput(props, ref) {
        return <input type="text" ref={ref}>
      }
      // ref转发
      const ForwardTextInput = React.forwardRef(TextInput)

      // 父组件
      this.sonRef = React.createRef()
      getSonvalue = () => {
        this.sonRef.current.value // 获取子组件对应DOM的值
      }
      <ForwardTextInput ref={sonRef}>
    ```

## 生命周期周期
  ### 旧生命周期
  - constructor
  - componentWillMount
  - render
  - componentDidMount

  - sholudComponentUpdate(nextPops, nextState)
  - componentWillUpdate
  - componentDidUpdate(prevProps, prevState, obj)
  
  - componentWillReceiveProps
  
  - componentWillUnmount
  ### 新生命周期
  - 移除了 componentWillMount / componentWillUpdate / componentWillReceiveProps。React17之后渲染的过程可能会不断的中断和恢复，will会执行多次
  - static getDerivedStateFromProps(nextProps, prevState)
    - 监控父级数据变化，为了取代componentWillReceiveProps
    - 类的方法，this指向undefined
    - 重写state值后就不能更改了
  - getSnapshotBeforeUpdate()
    - 获取数据更新前快照， render后

## DOM-DIFF算法
  ### React优化原则
  - 只对同级节点进行对比，如果DOM节点跨层级移动，则React不会复用
  - 不同类型的元素会产出不同的结构，会销毁老结构，构建新结构
  - 可以通过key标识移动的元素
  - 根据老节点生成oldMap，存储所有的节点。遍历新的虚拟DOM数组，判断oldMap中是否存在，同时更新lastplacedIndex数据，来对比是否需要移动旧节点。

## Context(上下文)
  - 某些场景下，整个组件树中传递数据，但不想一层层传递，可以使用context API解决
  - 再React应用中，数据是通过props属性自上而下进行传递，但这种做法对于某些类型的属性而言是极其繁琐（例如：地区偏好，UI主题），这些属性是应用程序中许多组件都需要的。Context提供了一种在组件之间共享此类值的方式，不必显示的通过组件树逐层传递props
  - 多个可以使用嵌套
  ```js
    // {
    //  $$typeof: Symbol(react.context)
    //  Consumer: {$$typeof: Symbol(react.context), _context: context}
    //  Provider: {$$typeof: Symbol(react.provider), _context: context}
    //  _currentValue: {}
    // }

    // 1引用Context
    const ThemeContext = React.createContext()

    // 2包裹子组件
    <ThemeContext.Provider value={obj}>
      <Son />
    </ThemeContext.Provider>

    // 3子组件静态获取
    static contextType = ThemeContext
    console.log(this.context.name)

    //
    <ThemeContext.Consumer>
      {
        value => ()
      }
    </ThemeContext.Consumer>
  ```

## 高阶组件
  - 高阶组件就是一个函数，传给它一个组件，它返回一个新组件
  - 高阶组件的作用其实就是为了组件件复用
    
  ### 属性代理
    ```js
      // 高阶组件
      //   入参组件
      //   返回组件
      //      返回组件中自定义属性或方法
      //      返回组件，返回入参组件,传入的props和自定义属性方法
      //              <Component {...this.props} show={this.show}>
      const WithLoading = (Component) => {
        return class extends React.Component{
          show = () => {}

          render() {
            return (
              <Component {...this.props} show={this.show} />
            )
          }
        }
      }
      
      // 入参组件通过props调用属性或方法
      class Panel extends React.Component{
        render() {
          return (
            <div onClick={this.props.show}>123</div>
          )
        }
      }
      
      const LoadingPanel = WithLoading(Panel)

    ```
  ### 反向继承
    - 基于反向继承：拦截生命周期、state、渲染过程


## render props
  - render prop是指一种在React组件之间使用一个值为函数的prop共享代码的简单技术
  - 具有render prop的组件接受一个函数，该函数返回一个React元素并调用它，而不是实现自己的渲染逻辑
  - render prop是一个用于告知组件需要渲染什么内容的函数prop
  - 这也是逻辑复用的一种方式
  ### 原生
  ### children
  ### render属性
  ### HOC
    - 可以转成高阶组件

## shouldComponentUpdate
  - 当一个组件的props或state变更，React会将最新放回的元素与之前渲染的元素进行对比，一次决定是否有必要更新真实的DOM，当他们不相同的React会更新该DOM
  - 如果渲染的组件非常多时可以通过覆盖生命周期方法 shouldComponentUpdate 来进行优化
  - shouldComponentUpdate 方法会在重新渲染前被触发，默认实现时返回true，如果组件不需要更新，可以在shouldComponentUpdate中返回false来跳过整个渲染过程。
  ### PureComponent
    - 在shouldComponentUpdate生命周期，比较属性或状态发生变化才会更新

    ```js
      class Element extends React.PureComponent{}
    ```
  ### memo
    - 数据浅比较
    - 深比较性能会比较差，使用immer实现深比较性能会好
    ```js
      React.memo()
    ```

## useState
  - useState是一个hook
  - 通过在函数组件里调用它来给组件添加一些内部state React会在重复渲染时保留这个state
  - useState会返回一对值，当前状态和更新函数，可以在事件处理函数中或其他一些地方调用这个函数，直接覆盖老数据
  - useState唯一的参数就是初始state
  - 返回一个state，以及更新state的函数
    - 在初始渲染期间，返回的状态state 与传入的第一个参数值相同
    - setState函数用于更新state。它接收一个新的state值并将组件的一次重新渲染加入队列
  ```js
    // 老版本的会有全局hook进行管理
    // setFn更新数据时，会对hookIndex进行重置
    let [num, setNum] = React.useState(0)
  ```

### useCallback / useMemo
  - 把内联回调函数及依赖项数组作为参数传入 useCallback,它将返回该回调函数的memoized版本，该回调函数仅在某个依赖项改变时才会更新
  - 把创建函数和依赖项数组作为参数传入 useMemo，它仅会在某个依赖项改变时才会重新计算 memoized值，这种优化有助于避免在每次渲染时都进行高开销
  ```js
  // useMemo() 固定的值
  const data = React.useMemo(() => ({number}), [number])
  // useCallback() 固定的函数
  const handleClick = React.useCallback(() => setNumber(number+1), [number])
  ```

### useReducer
  - useState的替代方案，它接收一个形如（state,action）=>newState的reducer，并返回当前state以及与其配套的dispatch方法
  - 在某些场景下useReducer会比useState更适用，例如state逻辑复杂且包含多个子值，或者下一个state依赖于之前的state

