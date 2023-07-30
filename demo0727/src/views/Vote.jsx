import React, { useState } from "react";

/*
    执行一次useState：把需要的状态信息都放在对象中统一管理
        + 执行setState方法的时候，传递的是啥值，就把状态“整体”改为啥值
        + 并不会像类组件中的this.setState一样，不支持部分状态的更新
*/

const Vote = (props) => {
    let [state, setState] = useState({
        supNum: 10,
        oppNum: 5,
    })
    const handle = (type) => {
        const {supNum, oppNum} = state
        if (type === 'sup') {
            setState({
                ...state,
                supNum: supNum + 1,
            })
            return
        }
        setState({
            ...state,
            oppNum: oppNum + 1,
        })
    }
    return (
        <div>
            <div className="header">
                <h2>{props.title}</h2>
                <span>{state.supNum + state.oppNum}</span>
            </div>
            <div className="main">
                <p>支持{state.supNum}人</p>
                <p>反对{state.oppNum}人</p>
            </div>
            <div className="footer">
                <button onClick={handle.bind(null, 'sup')}>
                    agree
                </button>
                <button onClick={handle.bind(null, 'opp')}>
                    reject
                </button>
            </div>
        </div>
    )
}

Vote.defaultProps = {
    title: 'test title'
}

export default Vote