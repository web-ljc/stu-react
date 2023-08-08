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
            + 第一次渲染完后，无法基于“内部的某些操作”让组件更新【无法实现自更新】，父组件可以控制其重新渲染【可能传递最新的属性值过来】
            + 函数组件具备：属性及插槽...【其它状态等内容几乎没有】
            + 优势：比类组件处理的机制简单，渲染速度更快
            + 基于FP（函数式编程）思想设计，提供更细粒度的逻辑组件和复用

        2. 类组件
            + 组件在第一次渲染完后，除了父组件更新可以触发其更新外，也可以基于组件内部的某些操作，让组件可以更新
            + 具备：属性、状态、周期函数、ref、插槽...【几乎组件应该有的东西都具备 】
            + 优势：功能强大
            + 基于OOP（面向对象编程）思想设计，更方便实现继承

        3. Hooks组件：在函数组件中使用 Hook 函数，让函数组件动态化
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
        + 回调函数中编写的和其上面编写的，会一起更新

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


7. React Hook组件开发
    0. Hook 是React 16.8的新增特性，并且只能运用到函数组件中
        - 基础Hook
            - `useState` 使用状态管理
            - `useEffect` 使用周期函数
            - `useContext` 使用上下文信息
        - 额外的Hook
            - `useReducer` useState的替代方案，借鉴redux处理思想，管理更复杂的状态和逻辑
            - `useCallback` 构建缓存优化方案
            - `useMemo` 构建缓存优化方案
            - `useRef` 使用ref获取DOM
            - `useImperativeHandle` 配合forwardRef一起使用
            - `useLayoutEffect` 与useEffect相同，但会在所有的DOM变更之后同步调用effect
            - ...
        - 自定义Hook

    1. useState及底层处理机制
        - 作用：在函数组件中使用状态，修改状态值可以让函数组件更新，类似于类组件中的setState
        - 语法： const [num, setNum] = useState(initialState)
            - 执行useState,传递的initialValue是初始的状态值
            - 执行这个方法，返回结果是一个数组：[状态值，修改状态的方法]
                + num变量存储的是获取的状态值
                + setNum变量存储的是：修改状态的方法
            - 执行 setNum(val)
                + 修改状态值改为val
                + 通知视图更新
        - 函数组件【Hooks组件】不是类组件，所以没有实例的概念【调用组件不再是创建类的实例，而是把函数执行，产生一个私有上下文】，函数组件中不涉及this的处理
        
        - 函数组件的每一次渲染（或更新），都是函数重新执行，产生一个全新的“私有上下文”
            + 内部的代码也需要重新执行
            + 涉及的函数需要重新的构建【这些函数的作用域（函数执行的上级上下文），是每一次执行DEMO产生的闭包】
            + 每一次执行DEMO函数，也会把useState重新执行，但是：
                + 执行useState，只有第一次，设置的初始值会生效，其余以后再执行，获取的状态都是最新的状态值【而不是初始值】
                + 返回的修改状态的方法，每一次都是返回一个新的
                ```js
                    var _state;
                    function useState(initialValue) {
                        if (typeof _state === 'undefined') {
                            if (typeof initialValue === 'function') {
                                _state = initialValue()
                            } else {
                                _state = initialValue
                            }
                        }
                        var setState = function setState(value) {
                            if(Object.is(_state, value)) return // 判断值是否改变，没变化不更新
                            _state = value
                            // 通知视图更新
                        }
                        return [_state, setState]
                    }
                    let [num1, setNum] = useState(0)
                ```

        - 执行一次useState：把需要的状态信息都放在对象中统一管理
            + 执行setState方法的时候，传递的是啥值，就把状态“整体”改为啥值
            + 并不会像类组件中的this.setState一样，不支持部分状态的更新

        - 同步异步
            + 在React18中，我们基于useState创建出来的“修改状态的方法”，他们的执行也是异步的
                + 原理：等同于类组件中的this.setState，基于异步操作 & 更新队列，实现状态的批处理
                + 在任何地方修改状态，都是采用异步编程的
            + 在React16中，也和this.setState一样，放在合成事件/周期函数中，也是异步操作，放在其它异步操作中会变成同步的，不会统一处理，而是处理多次

        - useState自带了性能优化的机制：
            + 每一次修改状态值的时候，会拿最新要修改的值和之前的状态值做比较【基于Object.is作比较】
            + 如果发现两次的值是一样的，则不会修改状态，也不会让视图更新【可理解为：类似于PureComponent，在shouldComponentUpdate中做了浅比较和优化】

        - 惰性处理：我们需要把基于属性传递进来的x/y，经过其他处理的结果作为初始值
            + 需要对初始值的操作，进行惰性处理，只有第一次渲染组件处理这些逻辑，以后组件更新，这样的逻辑就不再运行
    
    2. useEffect：在函数组件中，使用生命周期函数
        + useEffect(callback)
            + 第一次渲染完毕后，执行callback，等价于componentDidMount
            + 在组件每一次更新完毕后，执行callback，等价于componentDidUpdated  

        + useEffect(callback, [])
            + 只有第一次渲染完毕后，才会执行callback，等价于componentDidMount
            + 每一次视图更新完毕后，callback不执行

        + useEffect(callback, [依赖的状态（多个状态）])
            + 只有第一次渲染完毕后，才会执行callback，等价于componentDidMount
            + 当依赖的状态值（或者多个状态中的一个）发生改变，执行callback
            + 当依赖的状态值没有改变，在组件更新的时候，callback不执行

        + useEffect 返回小函数
            ```js
                useEffect(() => {
                    return () => {
                        // 返回的小函数，会在组件释放的时候执行
                        // 如果组件更新，会把上一次返回的小函数执行【可以理解为上一簇渲染的组件释放了】
                    }
                })
            ```

    3. useLayoutEffect 和 useEffect 细节
        - useEffect 必须在函数的最外层上下文中调用，不能把其嵌入到条件判断、循环等操作语句中、
        - useEffect 如果设置了返回值，则返回值必须是一个函数【等表组件销毁时触发】，callback经过async的修饰，返回的是一个promise实例，不符合要求
        
        - useLayoutEffect 会阻止浏览器渲染真实DOM，优先执行Effect链表中的callback
        - useEffect 不会阻塞浏览器渲染真实DOM，在渲染真实DOM的同时，去执行Effect链表中的callback
            - useLayoutEffect设置的callback要优先于useEffect去执行
            - 在两者设置的callback中，依然可以获取DOM元素【原因：真实DOM已经创建了，区别只是浏览器是否渲染】
            - 如果在callback函数中又修改了状态值【视图又要更新】
                + useEffect：浏览器肯定是把第一次的真实已绘制了，再去渲染第二次真实DOM
                + useLayoutEffect: 浏览器是把两次真实DOM的渲染，合并一起渲染的

        - 视图更新的步骤：
            1. 第一步：基于babel-preset-react-app把JSX编译为createElement格式
            2. 第二步：把createElement执行，创建出virtualDOM
            3. 第三步：基于root.render 方法把virtualDOM变为真实DOM对象【DOM-DIFF】
                - useLayoutEffect阻塞第四步操作，先去执行Effect链表中的方法【同步操作】
                - useEffect第四步操作和Effect链表中的方法执行，是同时进行的【异步操作】
            4. 第四步：浏览器渲染和绘制真实DOM对象

    4. useRef
        - 基于“ref={() => {}}”的方式，可以把创建的DOM元素（或者子组件的实例）赋值给box变量。【不推荐】
        - 基于 React.createRef 创建ref对象来获取想要的内容
        - 函数组件中，可以基于 useRef Hook函数，创建一个ref对象
            - useRef只能在函数组件中使用【所有的ReactHook函数，都只能在函数组件中使用，在类组件中使用会报错】
            - React.createRef 也是创建ref对象，可以在类组件使用，也可以在函数组件中使用
            - useRef在每一次组件更新的时候，再次执行useRef方法的时候，不会创建新的REF对象，获取到的还是第一次创建的REF对象
            - React.createRef在每一次组件更新的时候，都会创建一个全新的Ref对象，浪费性能
        - 在类组件中，创建REF对象，我们基于React.createRef处理，但是在函数组件中，为了保证性能，应该使用专属useRef处理。

        - 目的
            + 根据标签获取DOM元素
            + 基于ref获取子组件的实例，基于实例获取子组件内部的属性、方法等
            + 基于forwardRef实现ref转发，获取子组件内部某个元素
            + 结合 useImperativeHandle 获取子组件内部的状态或方法

    5. useMemo
        - useMemo就是一个优化的Hook函数
            - 如果函数组件中，有消耗性能和时间的计算操作，则尽可能用useMemo缓存起来，设置对应的依赖
            - 可以保证非依赖的状态发生改变，不会去处理一些没必要的操作，提高组件更新速度

        - 问题
            - 如果我们修改支持/反对数，视图更新的时候，可以让此逻辑重新计算
            - 如果我们是修改其它状态值，视图更新了，此逻辑没必要再重新执行了。【如果此逻辑执行的时间比价长，一定是影响视图更新速度】
        - 诉求：在函数每一次重新执行时，如果依赖的状态值没有发生变化，我们操作逻辑不该去执行。当依赖值发生改变，再去执行

        - let xxx = useMemo(callback, [dependencies])
            - 第一渲染组件的时候，callback会执行
            - 后期只有依赖的状态值发生改变，callback才会再执行
            - 每一次会把callback执行的返回结果赋值给xxx
            - useMemo具备“计算缓存”效果，在依赖的状态值没有发生改变，callback没有触发执行的时候，xxx获取的是上一次计算出来的结果。和Vue的计算属性非常相似

    6. useCallback
        - useCallback是一个优化函数
            + const xxx = useCallback(callback, [dependencies])
            + 第一次渲染，useCallback执行，创建一个函数“callback”，赋值给xxx
            + 组件后续每一次更新，判断依赖的状态值是否改变，如果改变，则重新创建新的函数堆，赋值给xxx，但是如果依赖的状态没有更新[或没有设置依赖]则xxx获取的一直是第一次创建的函数堆，不会创建新的函数出来
            + 或者说，基于useCallback，可以始终获取第一次创建函数的堆内存地址

        - 不能乱用，虽然减少了堆内存的开辟，但useCallback本身也有自己的处理逻辑和缓存机制，也消耗时间
        - useCallback不能乱用
            - 如果没有设置任何依赖，则函数永远是在第一次组件渲染，产生的闭包中创建的。
            - 函数中的用到的信息【向上级上下文中找】永远是第一次闭包中的信息

        - 场景：父组件嵌套子组件，父组件要把一个内部的函数，基于属性传递给子组件，此时传递的这个方法，基于useCallback处理会更好，这样传递的函数都是第一个地址，优化子组件渲染
            - 当父组件更新时，因为传递给子组件的属性仅仅是一个函数，所以不想让子组件也跟着更新
                1. 传递给子组件的属性，每一次都需要是相同的堆内存地址，基于useCallback处理
                2. 在子组件内部也要做一个处理，验证父组件传递的属性是否发生改变，
                    - 类组件：可以继承 PureComponent 即可【shouldComponentUpdate中对于新老属性做了浅比较】，如果没有变化，则让子组件不能更新。
                    - 函数组件：基于React.memo函数，对新老传递的属性做比较，如果不一致，才会执行函数。

    7. 自定义hook，提取公共逻辑
        - 作用：提取封装一些公共的处理逻辑
        - 使用：创建一个函数，名字useXXXX, 后期可以在组件中调用这个方法
            ```js
                const usePartialState = (initialValue) => {
                    const [state, setState] = useState(initialValue)
                    // setState不支持部分状态更改
                    // setPartial支持部分状态更改
                    const setPartial = (partialState) => {
                        setState({
                            ...state,
                            ...partialState
                        })
                    }
                    return [state, setPartial]
                }
            ```

8. 复合组件通信方案
    - 单项数据流
        - 属性传递方向是单向的
            + 父组件可以基于属性把信息传递给子组件
            + 子组件无法基于属性给父组件传递信息，但可以把父组件传递的方法执行，从而实现子改父
        - 关于生命周期的延续
            + 组件第一次渲染
                父componentWillMount -- 父render -- 子componentWillMount -- 子render -- 子componentDidMount -- 父componentDidMount
            + 组件更新
                父shouldComponentUpdate -- 父componentWillUpdate -- 父render -- 子componentWillReceiveProps -- 子shouldComponentUpdate -- 子componentWillUpdate -- 子render -- 子componentDidUpdate-- 父componentDidUpdate

    - 父子组件通信
        1. 以父组件为主导，基于“属性”实现通信
            + 原因：只有父组件可以调用子组件，此时可以基于属性，把数据传递给子组件
            - 父组件给子组件传递属性：可以基于属性props
            - 子组件更改父组件数据：可以基于属性props传递方法，子组件执行方法
            - 父组件传递HTML给子组件：可以基于属性中的children【插槽】

        2. 父组件基于ref获取子组件的实例【或者子组件基于useImperativeHandle暴露的数据和方法】
            - 父组件调用子组件：可设置ref获取子组件的实例，状态和方法

    - 祖先组件通信
        - 对于嵌套结构深的组件，基于属性一层层的向下传递会非常麻烦
        - 祖先组件需要把数据、方法，放在上下文中。后代组件可以直接去上下文中获取信息
        - 类组件
            1. 创建一个上下文对象，来管理上下文中信息
                ```js
                    const ThemeContext = React.createContext()
                ```
            2. 让祖先组件Vote，具备状态和修改状态的方法，同时还需要把这些信息，存储到上下文中
                - 基于上下文中，提供的Provider组件，用来：
                    - 向上下文中存储信息：value属性指定的值就是要存储的信息
                    - 当祖先组件更新，render重新执行，会把最新的状态值，再次存储到上下文对象中
                    ```js
                        <ThemeContext.Provider
                            value={{
                                supNum,
                                oppNum,
                                handle: this.handle
                            }}
                        >
                            <Parent />
                        </ThemeContext.Provider>
                    ```
            3. 在后代组件中，需要获取上下文中的信息
                - VoteMain：获取信息绑定即可
                - VoteFooter：获取信息，把获取的函数（修改组件状态的函数），在点击时执行
                - 方案一
                    1. 导入创建的上下文对象
                    2. 给类组件设置私静态私有属性 contextType=上下文对象
                        + 在this.context属性上，存储了上下文的所有信息
                    3. 从this.context中获取需要的信息
                    ```js
                        static contextType = ThemeContext
                        const { supNum, oppNum } = this.context
                    ```
                - 方案二
                    1. 利用提供的Consumer组件
                    ```js
                        <ThemeContext.Consumer>
                            {context => {
                                return <Child />
                            }}
                        </ThemeContext.Consumer>
                    ```
        - 函数组件
            1. 同类组件
            2. 同类组件
            3. 方案二同类组件
                - 函数组件：useContext
                ```js
                    const {supNum, oppNum} = useContext(ThemeContext)
                ```

9. 高阶组件：利用js中闭包【柯理化函数】实现的组件代理
    - 可以在代理组件中，经过业务逻辑的处理，获取一些信息，最后基于属性等方案，传递给我们最终要渲染的组件


##### 5455
1. Redux基础操作和思想
    - 公共状态管理方案
    - 后期开发中，父子组件一般基于：props/ref/redux。其余组件通信一般基于redux管理

    - 什么是Redux
        - Redux 是javascript应用的状态容器，提供可预测的状态管理
        - Redux 除了和React一起用外，还支持其它框架
        - Reudx 提供的模式和工具更容易理解应用程序中的状态：何时、何地、以及如何更新
    - 什么时候用Redux
        - 应用的大量地方，都存在大量的状态
        - 应用状态随着时间的推移而频繁更新
        - 更新状态的逻辑可能很复杂
        - 中行和大型代码量的应用，很多人协同开发
    - Redux库和工具
        - React-Redux:官方库、它让React组件和Redux有了交互，可以从store读取一些state，可以通过dispatch actions来更新store
        - Redux Toolkit：推荐的编写Redux逻辑方法
        - Redux DevTools拓展：可以显示Redux存储中状态随时间变化的历史记录

    - Redux
        - 在创建的store容器中，存储两部分内容
            + 公共状态：各组件需要共享/通信的信息
            + 事件池：存放一些方法【让组件可以更新的方法】
        - 特点：当公共状态一旦发生改变，会默认立即通知事件池中的方法执行，执行的主要目的就是让指定的组件更新，组件一更新就可以获取最新的公共信息进行渲染
        - 修改公共容器中的状态，不能直接去修改
            + 基于dispatch派发，通知reducer执行
            + 在reducer中去实现状态的更新

    - Redux5步核心操作
        1. 创建全局共的容器，用来存储各组件需要的公共信息
            const store = createStore([reducer])
        2. 在组件内部，获取公用状态信息渲染
            store.getState()
        3. 把“让组件可以更新”的方法，放在公共容器的事件池中
            store.subscribe()
        4. 创建容器的时候，需要传递 reducer
        5. 组件派发任务，通知reducer执行修改状态
            store.dispatch()
        6. 在根组件中，导入store放在上下文中，后期其它组件需要，只要是它的后代组件，则直接获取使用即可

    - Redux具体的编写顺序
        1. 创建store,规划出reducer【当中的业务处理逻辑可以后续不断完善，但是最开始的reducer的架子要先搭建好】
        2. 在入口基于上下文对象，把store放入到上下文中，需要用到store组件，从上下文中获取
        3. 组件中基于store，完成公共状态的获取、和任务的派发
            + 使用到公共状态的组件，必须向store的事件池中加入让组件更新的办法：只有这样才可以确保，公共状态改变，可以让组件更新，获取最新的状态进行绑定

    - reducer的拆分和合并
        1. 按照模块把reducer进行单独管理，每个模块都有自己的reducer，最后把所有reducer进行合并，赋值给store
            ```js
                import {combineReducers} from 'redux'
                const reducer = combineReducers({
                    vote: voteReducer,
                    personal: personalReducer
                })
            ```
            + reducer:最后合并的总的reducer
            + 此时容器中的公共状态，会按照设置的成员名字，分模块进行管理
            ```js
                state = {
                    vote: {
                        supNum: 10,
                        oppNum: 0
                    }
                    personal: {}
                }
            ```
            + 基于 store.getState() 获取状态。 store.getState().vote.supNum
            + 派发的操作不需要改动，每一次派发后，都会去所有reducer进行逐一匹配【用派发的行为标识，和每个模块reducer中判断的行为标识进行比较】和谁匹配成功，就执行谁的逻辑，只要匹配成功都会执行
            + 事件池中的方法都会全部执行

    - reducer派发行为标识宏管理
        - 每一次dispatch派发的时候，都会去每个reducer中找一遍，把所有派发行为标识匹配的逻辑执行
        - 问题：派发标识可能会冲突
        - 基于 “宏管理（统一管理）”，让所有派发的行为标识，唯一性
            + action-type.js
            + 为了保证不冲突，我们一般都这样命名：模块名_派发的行为标识[大写]。 VOTE_SUP
            + 变量和存储的值是一致的
            + 所有需要派发的行为标识，都在这里定义

    - acitonCreator的创建
        + 把派发的行为对象，按照模块进行统一管理
        + voteAction包含好多方法，每一个方法执行，都返回要派发的行为对象
        + 目前来看，此工程化步骤，不仅没好处，而且更麻烦了
        + 此操作的意义：创建actionCreator，接下来处理react-redux的时候，非常有用
        + 在不使用任何中间件的情况下，actionCreator对象中，是不支持异步操作的。我们要保证方法执行立马返回标准的action对象

    - combineReducers源码
        + 传入包含多个reducer键值对的对象
        + 返回一个reducer函数，函数返回state集合对象
            + 每一次dispatch派发，都是把这个reducer执行
            + state：redux容器中的公共状态
            + action：派发时候传递进来的行为对象

    - redux弊端
        + 基于getState获取的公共状态，是直接喝redux中的公共状态，共用相同的堆地址，这样导致可以直接修改公共状态信息。
            - 应该做深克隆
        + 把组件更新的方法，放在事件池中，当公共状态改变，会通知事件池中的所有方法执行。消耗性能。
            - 应该在向事件池中加入方法的时候，把依赖的信息也设置了。在每一执行reducer修改状态之前，把之前的状态存储一份，修改后的最新状态也获取到。通知事件池中方法执行的时候，拿出来的某个方法是否执行，可以判断依赖的状态是否改变
            - 做优化时会消耗一些性能，但后期结合react-router操作时，会让很多组件释放掉，只展示当前模块的组件，不会产生太大的影响。并且还可以在组件释放掉时，把对应更新的方法，从事件池中移除。
        + 所有reducer的合并，并不是代码合并，而是创建一个总的reducer，每一次派发都是让总的reducer执行，会把每个模块的reducer都完全执行一遍，即使已发现匹配逻辑，也会执行其他模块中的reducer
            - 在某个模块的reducer中，如果派发的行为标识匹配了，则停止执行后面的reducer。可以比执行前后状态是否变化

2. React-Redux基础操作和思想
    - react-redux基础运用
        + 主要是在组件应用的时候，更方便一些
        + 内部自己创建了上下文对象，并且可以把store放在上下文中，在组件中使用时，无需自己获取上下文的store
        
        1. 引入Provider
            ```js
                // 引入Provider
                import {Provider} from 'react-redux'
                // 设置全局环境
                <Provider store={store}>
                    <Vote />
                </Provider>
            ```
        2. 在组件使用中，无需基于上下文对象获取store。也无需基于getState获取公共状态，也无需手动把让组件更新的方法，放在事件池中
            ```js
                /*
                connect(mapStateToProps, mapDispatchToProps)(我们要渲染的组件)
                1. mapStateToProps：可以获取到redux的公共状态，把需要的信息作为属性，传递组件即可
                    connect(state => {
                        // 存储redux容器中，所有模块的公共状态信息
                        // 返回对象中的信息，就是要作为属性，传递给组件的信息
                        return {
                            supNum: state.vote.supNum
                        }
                    })(Vote)
                */
                // 引入connect
                import {connect} from "react-redux"
                // 通过props使用
                const {supNum, oppNum} = props
                // 包裹组件,通过props传递入参
                connect(
                    state => state.vote,
                    dispatch => {
                        return {
                            support() {
                                // dispatch({type: TYPES.VOTE_SUP})
                                dispatch(action.vote.support())
                            }
                        },
                    }
                )(Vote)
                /*
                    也可以直接传入actionCreators，会通过bindActionCreators方法进行编译，返回处理好的对象
                    console.log(bindActionCreators(action.vote, dispatch))
                    1.获取action.vote遍历所有属性到新对象中
                    2.给新对象属性添加方法: () => dispatch(action.vote.support())
                    3.返回新对象
                 */
                connect(
                    state => state.vote,
                    action.vote
                )(Vote2)
            ```
    - 源码
        - 创建React.createContext上下文
        - 创建connect方法
            - 获取props
            - 上下文中的store
            - 并获取state
            - 设置subscribe更新事件
            - 设置mapStateToProps/mapDispatchToProps

    - redux中间件及处理机制
        - store.dispatch 与 reducer中间的处理的插件
        + redux-logger每一次派发，在控制台输出派发的日志，方便对redux的操作进行调试，
            - 【输出的内容：派发之前的状态、派发的行为、派发后的状态】
        + redux-thunk/redux-promise 实现异步派发
            + 【每一次派发的时候，需要传递给reducer的action对象中的内容，是需要异步获取的】
            + 都是2次派发，第一次派发用的是，重写后的dispatch；
                - 这个方法不会去校验对象是否有type属性，也不在乎传递的对象是否为标准普通对象
                - 此次派发，仅仅是为了第二次派发做准备
                    - redux-thunk: 把返回的函数执行，把真正的dispath传递给函数
                    - redux-promise：监听返回的promise实例，在实例为成功后，需要基于真正的dispatch，把成功结果进行派发
                    - 区别：redux-thunk的第二次派发需要手动处理，redux-promise是自动处理了
                
            + redux-thunk
                - 点击按钮，执行support方法，把voteAction.support()执行，执行的返回值进行派发
                    1. 首先方法执行返回一个函数，内部给函数设置一个type属性，属性值不会和reducer中的逻辑匹配
                    2. 把返回的函数执行，把派发的方法dispatch传递给函数【在函数中，自己搞异步操作，异步操作成功后，在手动基于dispatch进行派发】
                ```js
                    // react-redux中connect处理的dispatch
                    // support() {
                    //    dispatch(action.vote.support()) // 重写了dispatch
                    // }

                    {
                        // redux-thunk
                        support() {
                            return async (dispatch) => {
                                await delay()
                                return dispatch({
                                    type: TYPES.VOTE_SUP
                                })
                            }
                        }
                        // redux-promise
                        async oppose() {
                            await delay(2000)
                            return {
                                type: TYPES.VOTE_OPP
                            }
                        }
                    }
                ```
            + redux-promise
                1. 此dispatch也是被重写的，传递进来的promsie实例
                    - 没有type属性，但是不报错
                    - 也不会通知reducer执行
                2. 会监听voteAction.oppose执行的返回值【promise实例】等待实例为成功的时候，它内部会自动再派发一次任务
                    - 用到的是store.dispatch派发，会通知reducer执行
                    - 把实例为成功的结果传【标准的action对象】递给reducer，实现状态更改



