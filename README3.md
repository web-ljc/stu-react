## React项目优化
### 1.编译阶段优化
1. webpack.config.js
2. src/index.js
3. public/index.html
4. package.json
5. 访问

### 2.路由切换优化
1. 路由懒加载
    - 针对路由封装做异步加载处理
    - lazy(() => import(/*webpackPrefetch:true*/'./views/User'))
    - lazy原理在componentDidMount声明周期，加载组件
    - webpackPrefetch:true，支持浏览器空闲时加载

### 3.更新阶段优化
1. PureComponent
2. memo
3. useMemo
4. useCallback

5. reselect插件优化 redux

### 4.大数据渲染
1. 时间分片
    - setTimeout 不是很流畅
    - requestAnimationFrame 每次浏览器渲染前执行
    - requestIdleCallback 在浏览器空闲时执行，不会阻塞优先级高的工作
        - fiber自己实现一套requestIdleCallback， MessageChannel基于宏任务实现
2. 虚拟列表
    - import VirtualList from 'react-tiny-virtual-list'

### 5.React性能分析器

### 封装灵活组件
1. 数据灵活，可传入数据
2. 结构灵活，使用插槽
3. 逻辑灵活，触发事件在父组件调用方法

