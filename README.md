### 吃透React
1. 版本
    - 16版本：项目用的最多
    - 17版本：语法没变，底层机制变了
    - 18版本：新版本[语法和机制上都有区别]

##### 04
2. React框架采用的是MVC体系，Vue框架采用的是MVVM体系
    - MVC：Model数据层 + View视图层 + controller控制层
        - 构建视图：React中基于jsx语法来构建视图
        - 构建数据层：在视图中，需要动态处理（需要变化的，样式或内容），都要对应数据模型
        - 控制层：在视图中（或者根据业务需求）进行某些操作的时候，都是去修改相关的数据，然后React框架会按照最新的数据，重新渲染视图，让用户看到最新效果
        + 数据驱动视图的渲染
        + 视图中的表单内容更改，想要修改数据，需要开发者自己写代码实现
        + “单向驱动”

    - MVVM：Model数据层 + View视图层 + viewModel数据/视图监听层
        - 数据驱动视图的渲染：监听数据的更新，让视图重新渲染
        - 视图驱动数据的更改：监听页面中表单元素内容更改，自动去修改相关的数据
        + “双向驱动”

    - Model-View机制不同，React内部实现机制，提供相关的方法可以在更改状态的同时，通知视图重新渲染。Vue是对状态做数据劫持。
        - setState修改状态同时通知视图渲染
        - forceUpdate通知视图强制更新

##### 0203
1. 搭建react项目使用官方脚手架: create-react-app
    + [`脚手架`](http://www.baidu.com): 基于它创建项目，默认就把webpack的打包规则已经处理好，把一些项目基本内容创建好。
    + 基础使用create-react-app
        - 安装脚手架 $ npm i create-react-app -g [mac 面前设置sudo]
        - 检查安装 create-react-app --version
    + 基于脚手架创建React工程化项目
        - create-react-app projectName
            - 项目名称要遵循npm包命名规范:使用数字、小写字母、下划线

2. 一个React项目，会默认安装：
    - react：React项目的核心
    - react-dom：React视图渲染的核心[基于React构建WebApp（HTML）]
    -----> react-native：构建和渲染App
    - react-scripts: 脚手架为了让目录干净，把webpack打包规则及相关插件/LOADER都隐藏到node_modules目录里
        - script 的eject命令是暴露webpack配置规则
    - web-vitals：性能检测工具

    - eslintConfig 对webpack中Eslint词法检查的相关配置
    - browserslist 设置浏览器兼容，编译软件会针对编译

3. 执行yarn eject显示webpack打包配置
    - 新增config文件夹，包含webpack的配置文件
        - webpack-dev-server的配置
        - 脚手架默认webpack打包规则配置
        - 路径管理配置
    - 新增script文件，执行命令入口文件,
    - 更改package.json，将编译包重新安装，且没有eject命令，暴露后不可还原

    + 常见的配置修改
        + 把sass改为less / module
            yarn add less less-loader@8
            yarn remove sass-loader
        + 配置别名 / resolve
        + 更改项目访问ip / scripts/start.js
        + 修改浏览器兼容 / package.json/browserslist
            - 对postcss-loader生效：控制css3前缀
            - 对babel-loader生效：控制ES6的转换
            - 但无法处理ES6内置API的兼容，需要@babel/polyfill对常见内置API的重写
            - 脚手架中安装了react-app-polyfill，不需手动安装babel-polyfill
        + 处理Proxy跨域
            - 在src目录新建 setupProxy.js
            - 安装http-proxy-middleware:实现跨域代理的模块，webpack-dev-sever的跨域代理原理，也是基于它完成
                yarn add http-proxy-middleware

    + 更改运行命令的env，需要安装[cross-env](https://blog.csdn.net/weixin_45249263/article/details/123719280)

##### 0506
1. JSX构建视图的基础知识
    - JSX：javascript and xml(html) 把JS和HTML标签混合在一起，并不是字符串拼接
        - vscode如何支持JSX语法[格式化、 快捷提示...]
            + 创建js文件，把后缀名设置为jsx，js文件中就可以支持jsx语法了
            + webpack打包的规则中，也会对.jsx这种文件，按照JS的方式进行处理
        - 在HTML中嵌入`JS表达式`，需要基于`{}`语法
            + JS表达式：执行有结果的。
                1. 变量/值 {a}
                2. 数学运算 {1+1} {x+y}
                3. 判断:三元运算符 {a ? '2' : '3'}
                4. 循环:借助于数组的迭代方法处理，map
        - 在ReactDOM.createRoot()的时候，不能把html/body作为根容器，需要制定一个额外的盒子
        - 每一个构建的视图，只能有一个“根结点”
            + 出现多个根结点会报错
            + React给我们提供了一个特殊的节点（标签）：React.Fragment 空文档标记标签
                + <></> 即保证了一个根节点，也不会增加一个HTML层级结构
        - {}胡子语法中嵌入不同的值，所呈现出来的特点
            + number/string：值是什么就渲染什么
            + boolean/null/undefined/Symbol/BigInt：渲染的内容是空
            + 除数组对象外，其余对象一般都不支持在{}中进行渲染，但也有特殊情况
                - JSX虚拟DOM对象
                - 给元素设置style行内样式，要求必须写成一个对象格式
            + 数组对象：把数组的每一项都分别拿出来渲染，并不是变成字符串渲染，中间没有逗号
            + 函数对象：不支持在{}中渲染，但是可以作为函数组件，用<Component/>方式渲染
        - 给元素设置样式
            + 行内样式:需要基于对象的格式处理，直接写样式字符串会报错
                ```js
                    <h2
                        className='box'
                        style={{
                            color: 'red',
                            fontSize: '30px' // 样式属性要基于驼峰命名法
                        }}
                    >我在学习React</h2>
                ```
            + 设置样式类名：需要把class替换为className

        - 命名规范
            - 小驼峰 camelCase 首字母小写，其余每一个有意义单词大写
            - 大驼峰 PascalCase 首字母都大写
            - kabab-case
        - 数组
            - 每一项为empty的数组，为稀疏数组，不能使用迭代方法forEach map
            - 每一项不为empty的数组，为密集数组

    - index.js
        ```js
            import React from 'react'; // React语法核心
            import ReactDOM from 'react-dom/client'; // 构建HTML(webapp)的核心
            const root = ReactDOM.createRoot(document.getElementById('root')) // 获取页面中#root的容器，作为‘根’容器
            // 基于render方法渲染编写的视图，把渲染后的内容，全部插入到#root中进行渲染
            root.render(
                ...
            )
        ```

##### 0708
1. 关于JSX底层处理机制
    1. 把编写的JSX语法，编译为虚拟DOM对象[virtualDOM]
        - 虚拟DOM对象：框架内部构建的一套对象体系（对象的相关成员都是React内部规定的）,基于这些属性描述出，我们所构建视图中的DOM节点的相关特征
            1. 基于babel-preset-react-app 把JSX编译为 React.createElement(...) 格式
                * 只要是元素节点，必然会基于createElement进行处理
                    + React.createElement(ele, props, ...children)
                    + ele：元素标签名、或组件
                    + props：元素的属性集合，如果没有设置过任何属性，则值是null
                    + children：第三个及以后的参数，都是当前元素的字节点
                    ```js
                        // 经babel编译后 
                        React.createElement(
                            "React.Fragment",
                            null,
                            React.createElement(
                                "h2",
                                { className: "title", style: styObj }, 
                                "\u5B66\u4E60React"
                            ),
                            React.createElement(
                                "div",
                                { className: "box" },
                                React.createElement("span", null, x), 
                                React.createElement("span", null, y)
                            )
                        );
                    ```
            2. 再执行 createElement 方法，创建出 virtualDOM 虚拟DOM对象[JSX元素、 JSX对象、 ReactChild对象]
                ```js
                    virtualDOM = {
                        $$typeof: Symbol(react.element),
                        ref: null,
                        key: null,
                        type: '标签名或组件',
                        props: { // 存储了元素的相关属性 & 字节点信息
                            childeren: [] || '', // 没子节点没有这个属性，一个直接展示，多个内容数组
                            id,                  // 属性
                            ...
                        }
                    }
                ```

    2. 把构建的virtualDOM渲染为真实DOM
        - 真是DOM：浏览器页面中，最后渲染出来，让用户看见的DOM元素
        - 基于ReactDOM中的render方法处理
            ```js
                // V16
                ReactDOM.render(virtualDOM, document.getElementById('root'));
                // V18
                let root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(virtualDOM)
            ```


    3. 补充：第一次渲染页面是直接从virtualDOM -- 真实DOM；但是后期视图更新的时候，需要经过一个DOM-DIFF的对比，计算出补丁包PATCH，两次视图差异部分，把PATCH补丁包进行渲染
        - 第一次渲染完毕后，会把创建的virtualDOM缓存起来 -- oldVirtualDOM
        - 数据更新后，视图重新渲染，按照最新的数据，把JSX重新编译为“全新的virtualDOM”全部重新编译一遍，新的虚拟DOM对象
        - 拿新的虚拟DOM和之前缓存的虚拟DOM进行对比 DOM-DIFF算法，生成PATCH补丁包。例如：只有x部分变化
        - 最后只渲染补丁包PATCH

2. 打包编译
    - [babel](https://babeljs.io/repl#)


##### 0910
1. 函数组件的底层渲染机制
    - Vue中的组件开发
        1. 全局组件和局部组件
        2. 函数组件和类组件【vue3不具备函数组件】

    - React中的组件开发
        - 没有明确全局和局部的概念【可以理解为都是局部组件，不过可以把组件注册到react上，这样每个组件只要导入React即可使用】
        1. 函数组件
            + 第一次渲染完后，无法基于“内部的某些操作”让组件更新【无法实现自更新】，但是调用它的父组件更新了，那么相关的子组件也一定会更新。【可能传递最新的属性值过来】
            + 函数组件具备：属性...【其它状态等内容几乎没有】
            + 优势：比类组件处理的机制简单，渲染速度更快
        2. 类组件
            + 组件在第一次渲染完后，除了父组件更新可以触发其更新外，也可以基于组件内部的某些操作，让组件可以更新
            + 具备：属性、状态、周期函数、ref...【几乎组件应该有的东西都具备】
            + 优势：功能强大
        3. Hooks组件：在函数组件中使用React Hooks函数
            + 具备了函数组件+类组件各自的优势，在函数组件的基础上，基于hooks函数，让函数组件拥有状态、周期函数等，让函数组件也可以自更新【动态化】

    - 静态组件和动态组件
        - 函数组件是静态组件：第一次渲染完后，无法基于“内部的某些操作”让组件更新【无法实现自更新】，但是调用它的父组件更新了，那么相关的子组件也一定会更新。【可能传递最新的属性值过来】
        - 动态组件：组件在第一次渲染完后，除了父组件更新可以触发其更新外，也可以基于组件内部的某些操作，让组件可以更新，有类组件、Hooks组件

    - 函数组件
        - 创建：在src目录中，创建一个xxx.jsx的文件，就是要创建一个组件；我们在文件中，创建一个函数，让函数返回JSX视图【或者JSX元素、virtualDOM虚拟DOM对象】，这就是创建了一个函数组件。
        - 调用：基于ES6Module规范，导入创建的组件【可以忽略.jsx后缀名】，然后像写标签一样调用
            - 单闭合调用： <Component />
            - 双闭合调用: <Component>...</Component>
                - 可以传递子节点，在传递给函数的props中，有一个children属性，存储子节点
        - 命名：组件的名字，PascalCase格式
        - 调用组件的时候，可以给调用的组件设置各种属性
            <!-- <DemoFunction title="函数组件" className="box" data={[100, 200]} /> -->
            + 如果设置的属性值不是字符串格式，需要基于“{}胡子语法”进行嵌套
            + 调用组件的时候，可以把一些数据/信息基于属性props的方式，传递给组件
        - 渲染机制
            1. 基于babel-perset-react-app把调用的组件转换为createElement格式
                ```js
                    React.createElement(DemoFunction, {
                        title: "\u51FD\u6570\u7EC4\u4EF6",
                        className: "box",
                        data: [100, 200]
                    })
                ```
            2. 把createElement方法执行，创建出一个virtualDOM对象
                ```js
                    {
                        $$typeof: Symbol(react.element),
                        key: null,
                        ref: null,
                        props: { // 如果有子节点也包含children
                            title: "\u51FD\u6570\u7EC4\u4EF6",
                            className: "box",
                            data: [100, 200]
                        },
                        type: DemoFunction
                    }
                ```
            3. 基于root.render把virtualDOM变为真实DOM
                - type值不再是一个字符串，是一个函数
                - 把函数执行 -- DemoFunction()
                - 把virtualDOM中的props，作为实参传递给函数 -- DemoFunction(props)
                - 接收函数执行的返回结果【也就是当前组件的virtualDOM对象】
                - 最后基于render把组件返回的虚拟DOM变为真实DOM，插入到#root容器中
        - 属性props的处理
            1. 调用组件，传递进来的属性是只读的【原理：props对象被冻结了】 Object.freeze(props)
                - 获取：props.xxx
                - 修改：props.xxx = yyy => 报错
                    - 如果就要修改传递的属性值，可以将传递的属性值赋给一个变量，更改变量
            2. 作用：父组件调用子组件的时候，可以基于属性，把不同的信息传递给子组件，子组件接收相应的属性值，呈现不同的效果，让组件的复用性更强
            3. 虽然对于传递的属性不能直接修改，但是可以做规则校验
                - 设置默认值
                    ```js
                        DemoFunction.defaultProps = {
                            title: ''
                        }
                    ```
                - 设置其它规则，例如：数据值格式、是否必传。【必须依赖官方的一个插件：prop-typs】
                    - 传递进来的属性，首先会经历规则校验，不管校验成功还是失败，都会把属性传递给props，只不过如果不符合设定的规则，控制台会抛出警告错误，不影响取值
                        ```js
                        import PropTypes from "prop-types"
                        函数组件.propTypes = {
                            // 类型是字符串、必填
                            title: PropTypes.string.isRequired,
                            // 多种校验规则中的一个
                            x: PropTypes.oneOfType([
                                PropTypes.string,
                                PropTypes.number,
                            ])
                            ...
                        }
                    ```
        - 插槽处理机制
            - 封装组件的时候，预留组件位置，内容不需要写，调用组件的时候，基于双闭合调用方式把插槽信息【子节点信息】，传递给组件；组件内部进行渲染
            - 传递数据值用属性，传递HTML结构用插槽
            - 具名插槽，给插槽起名字。在调用组件，传递插槽信息的时候，可以不用考虑顺序，直接设置好对应的名字
            - 插槽组件如何获取、更改父组件数据？？？？？

    - 关于对象的规则设置
        + 冻结
            - 冻结对象：Object.freeze(obj)
            - 检测是否冻结：Object.isFrozen(obj) => true / false
            - 被冻结的对象，不能修改成员值，不能新增成员，不能删除成员、不能给成员做劫持
        + 密封
            - 密封对象：Object.seal(obj)
            - 检测是否被密封：Object.isSealed(obj)
            - 被密封的对象：可以修改成员的值，但不能删除、不能新增、不能劫持
        + 不可扩展
            - 把对象设置为不可扩展：Object.preventExtensions(obj)
            - 检测是否可扩展：Object.isExtensible(obj)
            - 被设置不可扩展的对象：除了不能新增成员、其余的操作都可以
        + 被冻结的对象，即使不可扩展，也是密封的

2. 类组件的底层渲染机制
    - render函数在渲染的时候，如果type是：
        + 字符串：创建一个标签
        + 普通函数：把函数执行，并把props传递给函数
        + 构造函数：把构造函数基于new 去执行【创建类的一个实例】，也会把解析出来的props传递过去
            + 每调用一次类组件都会创建一个类实例
            + 把在类组件中编写的render函数执行，把返回的JSX【virtualDOM】当作视图进行渲染

            ```js
                new Vote({
                    title: '投票'
                })
            ```
    - 类组件是-动态组件
        + 创建一个构造函数（类）
          + 求必须继承React.Component/PureComponent这个类
          + 习惯使用ES6中的class创建类
          + 必须给当前类设置一个render方法【放在原型上】，在render方法中，返回需要渲染的视图

    - 从调用类组件 new Vote() 开始，类组件内部发生的事情：
        1. 初始化属性
            + 先校验规则，校验完毕后，再处理属性的其它操作
                方案一
                constructor(props) {
                    super(props) // 把传递进来的属性挂载到this实例上
                }
                方案二：即便我们不在constructor中处理，在constructor处理完毕后，React内部也会把传递的props挂载到实例上，
                    所以在其它的函数中，只要保证this是实例，就可以基于this.props获取传递的属性
                + 同样this.props获取的属性对象也是被冻结的 Object.isFrozen(this.props)
            + 规则校验
                static defaultProps={}
                static propTypes={}

        2. 初始化状态
            + 状态：后期修改状态，可以触发视图的更新
                需要手动初始化，如果我们没有做相关处理，则会默认往实例上挂载一个state，初始值为null  this.state=null
                state = {
                    ...
                }
            + 修改状态，控制视图更新
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
            + 已经把virtualDOM变为真实DOM【可以获取真实DOM】

    - 组件更新的逻辑【当修改了相关状态，组件会更新】
        1. 触发 shouldComponentUpdate 周期函数：是否允许更新
            shouldComponentUpdate(nextProps, nextState) {
                // nextState: 存储要修改的对象
                // this.state: 存储的还是修改前的状态【此时状态还没有改变】
                console.log('shouldComponentUpdate 更新', this.state, nextState);

                // 此周期函数需要返回true/false
                //  返回true：允许更新，会继续执行下一个操作
                //  返回false：不允许更新，接下来啥都不处理
                return false
            }
        2. 触发 componetWillUpdate 周期函数：更新之前
            + 此周期函数也是不安全的
            + 在这个阶段，状态/属性还没有被修改
        3. 修改状态值/属性值【让this.state.xxx改为最新的值】
        4. 触发 render 周期函数：组件更新
            + 按照最新的状态/属性，把返回的JSX编译为virtualDOM
            + 和上一次渲染出来的virtualDOM进行对比【DOM-diff】
            + 把差异的部分进行渲染【渲染为真实DOM】
        5. 触发 componentDidUpdate 周期函数：组件更新完毕
        + 特殊说明： 如果我们是基于 this.forceUpdate() 强制更新视图，会跳过 shouldComponentUpdate 周期函数的校验，直接从componentWillUpdate开始进行更新【视图一定更新】
 
    - 组件更新的逻辑【第二种：父组件更新，触发的子组件更新】
        1. 触发 componentWillReceiveProps 周期函数：接收最新属性之前
            + 周期函数是不安全的
            UNSAFE_componentWillReceiveProps(nextProps) {
                // this.props:存储之前的属性
                // nextProps:传递进来的最新属性
                console.log('componentWillReceiveProps 父组件更新', this.props, nextProps);
            }
        2. 触发 shouldComponentUpdate 周期函数
        ...

    - 组件卸载
        1. 触发 componentWillUnmount 周期函数：组件销毁之前
        2. 销毁

    - 深度优先原则：父组件在操作中，遇到子组件，一定是子组件处理完，父组件才能继续处理
        + 父组件第一次渲染：
            父componentWillMount -- 父render -- [子componentWillMount -- 子render -- 子componentDidiMount] -- 父componentDidMount
        + 父组件更新：
            父shouldComponetUpdate -- 父componentWillUpdate -- 父render -- [子componentWillReceiveProps - 子shouldComponentUpdate -- 子componentWillUpdate -- 子render -- 子componentDidiUpdate] -- 父componentDidiUpdate
        + 父组件销毁：
            父componentWillUnmount -- 处理中[子componentWillUnmount -- 子销毁] -- 父销毁

3. PureComponent 和 Component的区别：
    PureComponent会给类组件默认加一个shouldComponentUpdate周期函数
    + 在此周期函数中，它对新老的属性/状态，会做一个浅比较
    + 如果浅比较，发现属性和状态并没有改变，则返回false，不继续更新组件

    + 浅比较：只比较对象的第一级，对于深层次内容，不会再进行比较
        1. 先比较对象成员的数量，如果数量不一致，那么2个对象肯定不一致
        2. 对象引用，对比的是对象的堆地址，如果地址不同，内容相同也是不一样的

受控组件：基于修改数据/状态，让视图更新，达到需要的效果
非受控组件：基于ref获取DOM元素，操作DOM元素，来实现需求的效果

4. 基于ref获取DOM元素的语法
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
    
    4. 原理：在render渲染的时候，会获取vituralDOM的ref属性
        + 如果属性值是一个字符串，会给this.refs增加这样一个成员，成员值就是当前的DOM元素
        + 如果属性值是一个函数，会执行函数，把当前DO元素传递给这个函数【x - DOM元素】，而在函数执行的内部，一般会把DOM元素直接挂在实例的某个属性上
        + 如果属性值是一个ref对象，则会把DOM元素赋值给对象的current属性上

    5. 目的
        + 给元素标签设置ref， 目的：获取对应的DOM元素
        + 给类组件设置ref，目的：获取当前调用组件创建的实例，【后续可以根据实例获取子组件中的相关信息】
        + 给函数组件设置ref，直接报错Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
            + 但是我们可以配合 React.forwardRef 实现ref转发
            + 目的：获取函数子组件内部的某个元素
            ```js
                const Child3 = React.forwardRef(function Child3 (props, ref) {
                    // console.log(ref); // ref是调用Child3时，设置的ref属性值【函数】
                    // x => this.child3 = x
                    return <div>
                        子组件2
                        <button ref={ref}>按钮</button>
                    </div>
                })
            ```

5. setState
    - this.setState([partialState], [callback])
        - [partialState]：支持部分状态更改
            this.setState({
                x: 100 // 不论总共有多少状态，我们只修改了x，其余的状态不动
            })
        - [callback]：在状态更改/视图更新完毕后触发执行[只要执行了setState，callback一定会执行]
            + 发生在componentDidUpdate周期函数之后【componentDidUpdate会在任何状态更改以后触发执行；而回调函数方式，可以在指定状态更新后处理一些事情】
            + 特殊：即便我们基于 shouldComponetUpdate 阻止了状态/视图的更新，componentDidUpdate 函数周期肯定不执行，但设置的callback回调函数依然会被执行
        类似于Vue框架中的$nextTick
        - [fn]：函数
            this.setState(prevState => {
                // prevState:存储之前的状态值
                // return对象：就是我们想要修改的新状态值【支持修改部分状态】
                return {
                    x:xxx
                }
            })
            
    
    - 在React18中，setState都是“异步操作”【不论是在哪执行，例如：合成时间、周期函数、定时器】
        + React18中有一套更新队列的机制
        + 基于异步操作，实现状态的批处理
        + 目的：实现状态的批处理【统一处理】
            + 减少视图的更新次数，降低渲染消耗的性能
            + 让更新的逻辑和流程更加清晰&稳健
        + 原理：利用了更新队列【updater】机制来处理的
            + 在当前相同的时间段内【浏览器此时可以处理的事情中】，遇到setState会立即放入到更新队列中
            + 此时状态/视图还未更新
            + 当所有的代码操作结束，会“刷新队列”【通知更新队列中的任务执行】：把所有放入的setState合并在一起执行，只触发一次视图更新
    - 在React18 和 React16中，关于setState是同步还是异步，是有一些区别的
        + React18中：不论在什么地方执行setState，他都是异步的【都是基于updater更新队列机制，实现的批处理】
        + React16中：如果在合成事件【jsx元素中基于onCxx绑定的事件】、周期函数中、setState的操作是异步的。如果setState出现在其它的异步操作中【例如：定时器、手动获取DOM元素做的事件绑定等】，他将变为同步的操作【立即更新状态和让视图渲染】

    - flushSync:可以刷新“updater更新队列”,也就是让修改状态的任务立即批处理一次
        + import {flushSync} from "react-dom";

6. React合成事件
    - 合成事件是围绕浏览器原生事件，充当跨浏览器包装器的对象；它们将不同浏览器的行为合并为一个API，这样做是为了确保事件在不同浏览器中显示一致的属性
    - 基于React内部的处理，如果我们给合成事件绑定一个"普通函数"，当事件触发，绑定的函数执行，方法中的this会是undefined
        + 可以基于JS中bind方法：预先处理函数中的this和实参
        + 推荐：把绑定的函数设置为“箭头函数”，让其使用上下文中的this【也就是我们的实例】
    - 合成事件对象SyntheticBaseEvent: 在React合成事件触发的时候，也可以获取到事件对象，只不过此对象是合成事件对象
        + 合成事件对象，也包含了浏览器内置事件对象中的一些属性和方法
            + clinetX/clientY
            + pageX/pageY
            + target
            + preventDefault
            + stopPropagation
            + ....
            + nativeEvent: 基于这个属性，可以获取浏览器内置的实际对象
    - bind在React事件绑定的运用
        + 绑定的方法是一个普通函数，需要改变函数中的this是实例，此时需要用到bind
        + 想给函数传递指定的实参，可以基于bind预先处理【bind会把事件对象以最后一个实参传递给函数】
            + `<button onClick={this.handle4.bind(null, 10, 20)}>按钮4</button>`

    - 事件具备传播机制，例如：当我们触发inner的点击行为的时候
        1. 从最外层向最里层逐一查找【捕获阶段：分析出路径】
            window -> document -> html -> body -> root -> outer -> inner
        2. 把事件源（点击的这个元素）的点击行为触发【目标阶段】
            inner
        3. 按照捕获阶段分析出来的路径，从里到外，把每一个元素的点击行为也触发【冒泡阶段】
            window <- document <- html <- body <- root <- outer <- inner

        4. 事件和事件绑定：
            - 事件是浏览器赋予元素的默认行为
            - 事件绑定是给这个行为绑定一个方法
            - 即便我们没有给body的点击绑定方法，当我们点击body的时候，其点击行为也会被触发，只不过啥事都不做
        - `ev.stopPropagation`: 阻止事件传播【捕获、冒泡】
        - `ev.stopImmediatePropagtion`: 阻止事件传播，可以阻止当前元素绑定的其它方法【同级】，如果未执行，也不会再执行

    - 事件委托：利用事件的传播机制，实现的一套事件绑定处理方案
        - 例如：一个容器中，有很多元素都要在点击的时候做一些事情
            + 传统方案：首先获取需要操作的元素，然后逐一做事件绑定
            + 事件委托：给需要给容器做一个事件绑定【点击内部的任何元素，根据事件的冒泡传播机制，都会让容器的点击事件也触发；我们在这里，根据事件源，做不同的事情就可以了】
        - 优势：
            + 提高JS代码运行的性能，并且把处理的逻辑集中在一起
            + 给动态绑定元素做事件绑定
            + 某些需求必须基于事件委托处理，例如：除了点击xxx外，点击其余任何东西都yyy
        - 限制：
            + 当前操作的事件必须支持冒泡传播机制才可以
                例如：`mouseenter/mouseleave`等事件是没有冒泡传播机制
            + 如果单独做的事件绑定中，做了事件传播机制的阻止，那么事件委托中的操作也不会生效

    - React中合成事件的处理原则
        - “绝对不是”给当前元素基于`addEventListener`单独做的事件绑定，React中的合成事件，都是基于“事件委托”处理的
            - 在React17及以后版本，都是委托给#root容器【捕获和冒泡都做了委托】
            - 17版本以前，都是委托给documnet容器【只做了冒泡阶段的委托】
            - 对于没有实现事件传播机制的事件，才是单独做的事件绑定【例如：onMouseEnter/onMouseLeave】

        - 在组件渲染的时候，如果发现JSX元素属性中有onXXXX/onXxxCapture这样的属性，不会给当前元素直接做事件绑定，只是把绑定方法赋值给元素的相关属性
            例如：
            outer.onClick={() => { console.log('outer 冒泡') }} // 这不是DOM0级事件绑定
            outer.onClickCapture={() => { console.log('outer 捕获') }}

        - 对#root在这个容器做了事件绑定【捕获和冒泡都做了】
            - 原因：因为组件中所有渲染的内容，最后都会插入到#root容器中，这样点击页面中任何一个元素，最后都会把#root的点击行为触发
            - 而在给#root绑定的方法中，把之前给元素设置的onXxxx属性，在相应的阶段执行
                1. 视图渲染中，遇到合成事件绑定，并没有给元素做事件绑定，而是给元素设置对应的属性
                2. 给#root做事件绑定，#root上绑定的方法执行，把所有规划的路径中，有合成事件属性的都执行即可
        
        - 在16版本中，合成事件的处理机制，不再是把事件委托给#root元素了，而是委托给document元素，并且只做了冒泡阶段的委托；在委托的方法中，把onXxx/onXxxCapture合成事件属性进行执行
            - 在React16版本中，关于合成事件对象的处理，React内部是基于“事件对象池”，做了一个缓存机制，在React17及以后，去掉了这套事件对象池和缓存机制
                + 当每一次事件触发的时候，如果传播到了委托元素上【document/#root】，在委托方法中，我们首先会对内置事件对象做统一处理，生成合成事件对象
                    - 在React16版本中：为防止每一次都是重新创建出新的合成事件对象，它设置了一个事件对象池【缓存池】
                        - 本次事件触发，获取到事件操作的相关信息后，我们从事件对象池中 获取存储的合成事件对象， 把信息赋值给相关的成员
                        - 等待本次操作结束后，把合成事件对象中的成员信息都清空掉，再放入到 事件对象池 中
                        - 合成事件的对象还在，但是属性数据都清空了
                        - ev.persist() // 可以把合成事件对象中的信息保留下来
            - React18中并没有事件对象池机制，所以也不存在：创建的事件对象信息清空问题

    - 合成事件中其它细节
        1. 移动端的click会存在300ms延迟
            - 移动端
                - click是单击事件
                - 连着点2下，不会触发click，只会触发dbclick
                - 单击事件：第一次点击后，监测300ms，看是否有第二次点击操作，如果没有就是单击，如果有就是双击
            - pc端
                - click是点击
                - 连着点2下，会触发2次click，1次dblick
            - 单手指事件模型：touch
                - touchstart
                - touchmouve
                - touchuend
            - 解决移动端300ms延迟，可以根据单手指事件处理
        2. 在React中，循环给元素绑定的合成事件，本身就是基于事件委托处理的，无需我们再单独的设置事件委托的处理机制
            - vue中没有做事件委托处理机制，可以单独设置


