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
    3. 补充：第一次渲染页面是直接从virtualDOM -- 真实DOM；但是后期视图更新的时候，需要经过一个DOM-DIFF的对比，计算出补丁包PATCH，两次视图差异部分，把PATCH补丁包进行渲染
        - 第一次渲染完毕后，会把创建的virtualDOM缓存起来 -- oldVirtualDOM
        - 数据更新后，视图重新渲染，按照最新的数据，把JSX重新编译为“全新的virtualDOM”全部重新编译一遍，新的虚拟DOM对象
        - 拿新的虚拟DOM和之前缓存的虚拟DOM进行对比 DOM-DIFF算法，生成PATCH补丁包。例如：只有x部分变化
        - 最后只渲染补丁包PATCH

2. 打包编译
    - [babel](https://babeljs.io/repl#)
