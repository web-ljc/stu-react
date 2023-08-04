/*
    实现redux部分源码
*/

export const createStore = function createStore(reducer) {
    if (typeof reducer !== 'function') throw new TypeError('reducer must be function')

    let state, // 存放公共状态
        listeners = [] // 事件池

    /* 2. 获取公共状态 */
    const getState = () => {
        // 返回公共状态
        return state
    }

    /* 3. 向事件池中加入让组件更新的方法 */
    const subscribe = (listener) => {
        // 规则校验
        if (typeof listener !== 'function') throw new TypeError('不是一个函数')
        // 让组件更新方法加入到事件池，需要做去重处理
        if (!listeners.includes(listener)) {
            listeners.push(listener)
        }
        // 返回一个从事件池中移除方法
        return function unsubscribe() {
            const index = listeners.indexOf(listener)
            listeners.splice(index, 1)
        }
    }

    /* 4. 派发任务方法 */
    const dispatch = (action) => {
        // 规则校验
        if (!(typeof action === 'object')) throw new TypeError('action must be objects')
        if (typeof action.type === 'undefined') throw new TypeError('action must be objects')
        
        // 执行reducer，传递：公共状态、行为对象；接收执行的返回值，替换公共状态
        state = reducer(state, action)
        
        // 当状态更改，还需要把事件池中的方法执行
        listeners.forEach(listener => {
            listener()
        })

        return action
    }

    /* redux内部会默认进行一次dispatch派发，目的：给公共容器中的状态赋值初始值 */
    const randomString = () => Math.random().toString(36).substring(7).split('').join('.')
    dispatch({
        // type: Symbol()
        type:  '@@redux/INIT' + randomString()
    })

    // 返回创建的STORE对象
    return {
        getState,
        dispatch,
        subscribe
    }
}
