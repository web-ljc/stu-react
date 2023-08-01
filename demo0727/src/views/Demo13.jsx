import React, { useEffect, useState } from "react";

/*
    自定义HOOK
        作用：提取封装一些公共的处理逻辑
        使用：创建一个函数，名字useXXXX, 后期可以在组件中调用这个方法
*/

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
// 自定义HOOK，在组件第一渲染完毕后，统一干点啥
const useDidMount = (title) => {
    if (!title) title = 'React学习'
    useEffect(() => {
        document.title = title
    }, [])
}

const Vote = (props) => {
    let [state, setPartial] = usePartialState({
        supNum: 10,
        oppNum: 5,
    })
    
    useDidMount('哈哈哈哈')

    const handle = (type) => {
        const {supNum, oppNum} = state
        if (type === 'sup') {
            setPartial({
                supNum: supNum + 1,
            })
            return
        }
        setPartial({
            oppNum: oppNum + 1,
        })
    }
    return (
        <div>
            <div className="header">
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

export default Vote