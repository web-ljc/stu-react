
const combineReducers = (reducers) => {
    // reducers是一个对象，以键值对存储了 模块名：每个模块的reducer
    let reducerskeys = Reflect.ownKeys(reducers)
    // reducerskeys: ['vote', 'personal']

    /*
        返回一个合并后的reducer
            + 每一次dispatch派发，都是把这个reducer执行
            + state：redux容器中的公共状态
            + action：派发时候传递进来的行为对象
    */
    return function reducer(state = {}, aciton) {
        // 把reducers中每一个小的reducer执行；
        // 把对应模块的状态/action行为对象传递进来；返回的值替换当前模块下的状态
        let nextState = {}
        reducerskeys.forEach(key => {
            // key: vote/personal 模块名
            // reducer:每个模块的reducer
            let reducer = reducers[key]
            nextState[key] = reducer(state[key], aciton)
        })
        return nextState
    }
}

export default combineReducers
