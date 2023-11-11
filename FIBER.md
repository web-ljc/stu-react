## fiber
- fiber: 就是一种数据结构，有很多属性

- fiber架构
    - 为了弥补一些渲染不足，设计一些新的算法，为了让算法运行，出现fiber这种数据结构
    - fiber架构 = fiber数据结构 + 新的算法

- react应用 从始至终 管理着最基本的三样东西
    1. Root【整个应用的根儿 一个对象 不是fiber 有个属性指向current树，有个属性指向workInProgress树】
    2. current树【树上的每一个节点都是fiber 保存的是上一次的状态 并且每个fiber节点 都对应着一个isx节点】
    3. workInProgress树【树上的每一个节点都是fiber 保存的是本次新的状态 并且每个fiber节点都对应
-个jsx节点】

- 初次渲染的时候 没有current树
- react在一开始创建Root 就会同时创建一个 uninitialFiber 的东西（未初始化的fiber）
- 让react的current指向了uninitialFiber
- 之后再去创建一个本次要用到的workInProgress



- react中主要分两个阶段
    - 不管是初次渲染还是setState，每次更新都是从Root开始往下遍历

    - render阶段（创建fiber的过程）
        1. 为每个节点创建新的fiber(workInProgress)（可能是复用）生成一颗有新状态的workInProgress树
        2. 初次渲染的时候(或新创建了某个节点的时候)会将这个fiber 创建真实的dom实例，并且对当前节点的子节点进行插入
        3. 如果不是初次渲染的话 就对比新旧的fiber的状态 将产生了更新的fiber节点 最终通过链表的形式 挂载到RootFiber

    - commit阶段(真正要操作页面的阶段)
        1. 才是真正要操作页面的阶段
        2. 会从RootFiber上获取到那条链表 根据链表上的标识 来操作页面


- setstate更新是同步的还是异步
    - 如果是正常情况下 也就是没有使用Concurrent组件的情况下 是同步更新的
    - 但是 不会立即获取到最新的state的值 因为调用setState只是单纯地将你传进来的
    - 新的state放入updateQueue这条链表上 等这个点击車件结束之后 会触发内部的一个回调函数
    - 在这个回调函数中 才会真正地去更新state以及重新渲染

    - 当使用了Concurrent组件的时候 这种情况下才是真正的异步更新模式
    - 同样的没法立即获取最新状杰 并且在执行react的更新和渲染的过程中
    - 使用了真正的异步方式(postMessage)

    - 当使用了fushSync这个API的时候 react的更新渲染 完全是同步的，自定义绑定事件、定时器
    - 会立即触发更新state以及渲染的过程，这种情况可以获取到最新的状态


