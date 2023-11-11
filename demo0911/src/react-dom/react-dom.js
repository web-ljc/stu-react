let isFirstRender = false
const HostRoot = 'HostRoot' // 标识RootFiber类型
const ClassComponent = 'ClassComponent' // 类组件的类型
const HostComponent = 'HostComponent' // 原生dom类型
const HostText = 'HostText' // 文本类型
const FunctionComponent = 'FunctionComponent' // 函数组件类型

const NoWork = 'NoWork' // 没有任何工作
const Placement = 'Placement' // 插入
const Update = 'Update' // 更新
const Deletion = 'Deletion' // 删除
const PlacementAndUpdate = 'PlacementAndUpdate' // 换节点位置并更新

let nextUnitOfWork = null

// fiber节点
class FiberNode{
    constructor(tag, key, pendingProps) {
        this.tag = tag // 标识当前fiber的类型
        this.key = key
        this.type = null // 'div', 'Ding'
        this.stateNode = null // 表示当前fiber的实例
        this.child = null // 当前fiber的子节点 每个fiber有且只有一个指向它的firstChild
        this.sibling = null // 当前节点的兄弟节点 每个fiber有且只有一个属性指向隔壁的兄弟节点
        this.return = null // 当前fiber的父节点
        this.index = 0
        this.memoizedState = null // 表示当前fiber的state
        this.memoizedProps = null // 表示当前fiber的props
        this.pendingProps = pendingProps // 新传入props

        this.effectTag = NoWork // 节点进行何种更新
        this.firstEfftct = null // 当前节点的有更新的第一个子节点
        this.lastEffect = null // 当前节点有更新的最后一个子节点
        this.nextEffect = null // 下一个要更新的子节点

        this.alternate = null // 用来连接current和workInProgress的
        this.updateQueue = null // 一条链表，挂载当前fiber的新的状态
    }
}

// 创建fiber节点
function createFiber(tag, key, pendingProps) {
    return new FiberNode(tag, key, pendingProps)
}

// 创建workInProgress
function createWorkInProgress(current, pendingProps) {
    let workInProgress = current.alternate // 复用上次的workInprogress，alternate
    if (!workInProgress) { // 没有映射节点，不存在workInProgress节点，创建新fiber节点，并映射
        workInProgress = createFiber(current.tag, current.key, pendingProps)
        workInProgress.type = current.type
        workInProgress.stateNode = current.stateNode
        // 两个树相指
        workInProgress.alternate = current
        current.alternate = workInProgress
    } else { // 已复用节点，
        workInProgress.pendingProps = pendingProps
        workInProgress.effectTag = NoWork
        workInProgress.firstEfftct = null
        workInProgress.lastEffect = null
        workInProgress.nextEffect = null
    }

    // 保证current和current.alternate上的updateQueue是同步的
    // 因为每次执行setState的时候会创建新的更新，把更新挂载到组件对应的fiber上
    // 这个fiber在奇数次更新时，存在于current树上，在偶数次更新时存在于current.alternate
    // 每次创建或复用workInProgress是从current.alternate上拿的对象
    // 复用这个alternate上uddateQueue上不一定有新的更新
    // 所以这里要判断 current.alternate上没有新的更新的话，说明本轮更新，找到这个fiber 存在于current树

    // 源码中是在执行createWorkInProgress之前，调用了一个enqueueUpdate方法
    // 这个方法中，将fiber和current.alternate上的updateQueue的新状态进行了同步

    // 只有初次渲染的时候，会给组件的实例一个属性，指向fiber
    // 以后fiber不会再改变
    if (
        !!workInProgress &&
        !!workInProgress.updateQueue &&
        !workInProgress.updateQueue.lastUpdate
    ) {
        workInProgress.updateQueue = current.updateQueue
    }
    
    workInProgress.child = current.child
    workInProgress.memoizedState = current.memoizedState
    workInProgress.memoizedProps = current.memoizedProps
    workInProgress.sibling = current.sibling
    workInProgress.index = current.index
    
    return workInProgress
}


function reconcileSingleElement(returnFiber, element) {
    let {type} = element,
        flag = null
    if (element.$$typeof === Symbol.for('react.element')) {
        if (typeof type === 'function') {
            if (type.prototype && type.prototype.isReactComponent) {
                flag = ClassComponent
            }
        } else if (typeof type === 'string') {
            flag = HostComponent
        }
        let fiber = createFiber(flag, element.key, element.props)
        fiber.type = type
        fiber.return = returnFiber
        return fiber
    }
}
function reconcileSingleTextNode() {}
function reconcileChildrenArray(workInProgress, nextChildren) {
    // 这个方法要通过index和key找到尽可能多可复用的dom节点
    // 这个函数就是react中最复杂的diff算法
    let nowWorkInProgress = null
    if (isFirstRender) {
        nextChildren.forEach((reactElement, index) => {
            if (index === 0) {
                if (typeof reactElement === 'string' || typeof reactElement === 'number') {
                    workInProgress.child = reconcileSingleTextNode(workInProgress, reactElement)
                } else {
                    workInProgress.child = reconcileSingleElement(workInProgress, reactElement)
                }
                nowWorkInProgress = workInProgress.child
            } else {
                if (typeof reactElement === 'string' || typeof reactElement === 'number') {
                    nowWorkInProgress.sibling = reconcileSingleTextNode(workInProgress, reactElement)
                } else {
                    nowWorkInProgress.sibling = reconcileSingleElement(workInProgress, reactElement)
                }
                nowWorkInProgress = nowWorkInProgress.sibling
            }
        })
        return workInProgress.child
    }
}
function reconcileChildrenFiber(workInProgress, nextChildren) {
    // debugger
    if (typeof nextChildren === 'object' && !!nextChildren && !!nextChildren.$$typeof) {
        // react元素
        return reconcileSingleElement(workInProgress, nextChildren)
    } else if (Array.isArray(nextChildren)) {
        return reconcileChildrenArray(workInProgress, nextChildren)
    } else if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
        return reconcileSingleTextNode(workInProgress, nextChildren)
    }
    return null
}
function reconcileChildren(workInProgress, nextChildren) {
    if (isFirstRender && !!workInProgress.alternate) {
        workInProgress.child = reconcileChildrenFiber(workInProgress, nextChildren)
        workInProgress.child.effectTag = Placement
    } else {
        workInProgress.child =  reconcileChildrenFiber(workInProgress, nextChildren)
    }
    return workInProgress.child
}
function updateHostRoot(workInProgress) {
    let children = workInProgress.memoizedState.element
    return reconcileChildren(workInProgress, children)
}
function updateClassComponent(workInProgress) {
    let component = workInProgress.type
    let nextProps = workInProgress.pendingProps
    if (component.defaultProps) {
        nextProps = Object.assign({}, component.defaultProps, nextProps)
    }
    let shouldUpdate = null
    let instance = workInProgress.stateNode
    if (!instance) {
        // 没有实例，说明是初次渲染或新创建节点
        instance = new component(nextProps)
        workInProgress.memoizedState = instance.state
        workInProgress.stateNode = instance
        instance._reactInternalFiber = workInProgress
        instance.updater = classComponentUpdater

        // 用来代替 componentWillReceiveProps
        let getDerivedStateFromProps = component.getDerivedStateFromProps
        if (!!getDerivedStateFromProps) {
            let prevState = workInProgress.memoizedState
            let newState = getDerivedStateFromProps(nextProps, prevState)
            if (!(newState === null || newState === undefined)) {
                if (typeof newState === 'object' && !(Array.isArray(newState))) {
                    workInProgress.memoizedState = Object.assign({}, nextProps, newState)
                }
            }
            instance.state = workInProgress.memoizedState
        }
        // 处理生命周期
        shouldUpdate = true
    } else {}
    debugger
    let nextChild = instance.render()
    return reconcileChildren(workInProgress, nextChild)
}
function updateHostComponent(workInProgress) {
    let nextProps = workInProgress.pendingProps
    let nextChildren = nextProps.children

    // 对于文本类型节点，不一定每次都创建对应fiber
    // 有兄弟节点会创建对应fiber，独生子节点时不会创建fiber，直接返回null
    if (typeof nextChildren === 'string' || typeof nextChildren === 'number') {
        nextChildren = null
    }

    return reconcileChildren(workInProgress, nextChildren)
}
function beginWork(workInProgress) {
    let tag = workInProgress.tag
    let next = null

    if (tag === HostRoot) {
        next = updateHostRoot(workInProgress)
    } else if (tag === ClassComponent) {
        next = updateClassComponent(workInProgress)
    } else if (tag === HostComponent) {
        next = updateHostComponent(workInProgress)
    } else if (tag === HostText) {
        next = null
    }
    return next
}

function completeWork(workInProgress) {
    // 1. 创建真实DOM
    let tag = workInProgress.tag
    let instance = workInProgress.stateNode
    if (tag === HostComponent) {
        if (!instance) {
            // 说明节点初次挂载
            let domElement = document.createElement(workInProgress.type)
            domElement._reactInternalInstance = workInProgress
            workInProgress.stateNode = document
            // 2. 对子节点进行插入
            let node = workInProgress.child
            wapper: while (!!node) {
                let tag = node.tag
                if (tag === HostComponent || tag === HostText) {
                    domElement.appendChild(node.stateNode)
                } else {
                    node.child.return = node
                    node = node.child
                    continue
                }

                if (node === workInProgress) break
                
                while (node.sibling === null) {
                    if (node.return === null || node.return === workInProgress) {
                        break wapper
                    }
                    node = node.return
                }
                node.sibling.return = node.return
                node = node.sibling
            }
            // 3. 把属性给它
        }
    }
    
}
// 找父节点或兄弟节点
function completeUnitOfWork(workInProgress) {
    while(true) {
        let returnFiber = workInProgress.return
        let siblingFiber = workInProgress.sibling

        completeWork(workInProgress)

        if (!!siblingFiber) return siblingFiber // 先查找兄弟节点
        if (!!returnFiber) { // 查找父节点
            workInProgress =  returnFiber
            continue
        }
        return null
    }
}
function perforUnitOfWork(workInProgress) {
    // 生成子节点fiber
    let next = beginWork(workInProgress)
    if (next === null) {
        next = completeUnitOfWork(workInProgress)
    }
    return next
}
// 循环节点
function workLoop(nextUnitOfWork) {
    while(!!nextUnitOfWork) {
        nextUnitOfWork = perforUnitOfWork(nextUnitOfWork)
    }
}

let classComponentUpdater = {
    enqueueSetState() {}
}

class ReactRoot {
    constructor(container) {
        this._internalRoot = this._createRoot(container)
    }
    // 内部创建roote
    _createRoot(container) {
        let uninitialFiber = this._createUninitailFiber(HostRoot, null, null)
        let root = {
            container: container,
            current: uninitialFiber,
            finishedWork: null,
        }
        uninitialFiber.stateNode = root
        return root
    }
    // 创建未初始化的fiber
    _createUninitailFiber(tag, key, pendingProps) {
        return createFiber(tag, key, pendingProps)
    }
    // render渲染节点
    render(reactElement, callback) {
        let root = this._internalRoot
        // 创建workInProgress
        let workInProgress = createWorkInProgress(root.current, null)
        workInProgress.memoizedState = {element: reactElement}

        nextUnitOfWork = workInProgress
        workLoop(nextUnitOfWork)
        root.finishedWork = root.current.alternate
    }
}

const ReactDOM = {
    render(reactElement, container, callback) {
        isFirstRender = true
        let root = new ReactRoot(container) // 创建root
        container._reactRootContainer = root

        root.render(reactElement, callback)

        isFirstRender = false

    }
}

export default ReactDOM