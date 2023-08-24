import React, { useReducer } from "react";

// 初始状态
const initialState = {
    num: 0
}
// 创建局部store容器
const reducer = (state, action) => {
    state = {...state}
    switch(action.type) {
        case 'plus':
            state.num++
            break
        case 'minus':
            state.num--
            break
        default:
    }
    return state // 返回的状态信息
}

const A1 = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    // console.log(state, 99);
    return <div className="box">
        <span>{state.num}</span>
        <br />
        <button onClick={() => {
            dispatch({type: 'plus'})
        }}>add</button>
        <button onClick={() => {
            dispatch({type: 'minus'})
        }}>delete</button>
    </div>
}

export default A1