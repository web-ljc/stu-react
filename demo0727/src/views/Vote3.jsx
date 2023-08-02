import React, { useCallback, useState, useMemo, useContext } from "react";
import ThemeContext from "../ThemeContext";
/*
    函数组件：useContext
        const {supNum, oppNum} = useContext(ThemeContext)
*/

const Vote = (props) => {
    const [supNum, setSupNum] = useState(10)
    const [oppNum, setOppNum] = useState(0)

    const handle = useCallback((type) => {
        if (type === 'sup') {
            setSupNum(supNum + 1)
            return
        }
        setOppNum(oppNum + 1)
    }, [supNum, oppNum]) // 只要supNum/oppNum更新就会重新创建方法

    return (
        <ThemeContext.Provider
            value={{
                supNum,
                oppNum,
                handle
            }}
        >
            <div className="header">
                <h2>{props.title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <VoteMain supNum={supNum} oppNum={oppNum} />
            <VoteFooter handle={handle} />
        </ThemeContext.Provider>
    )
}

const VoteMain = (props) => {
    // const {supNum, oppNum} = props
    const {supNum, oppNum} = useContext(ThemeContext)

    let ratio = useMemo(() => {
        let ratio =  '--',
            total = supNum + oppNum;
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
        return ratio
    }, [supNum, oppNum])

    return (
        <div className="main">
            <p>支持{supNum}人</p>
            <p>反对{oppNum}人</p>
            <p>支持比率 {ratio}</p>
        </div>
    )
}

const VoteFooter = () => {
    return <ThemeContext.Consumer>
        {context => {
            const {handle} = context
            return (
                <div className="footer">
                    <button onClick={handle.bind(null, 'sup')}>
                        agree
                    </button>
                    <button onClick={handle.bind(null, 'opp')}>
                        reject
                    </button>
                </div>
            )
        }}
    </ThemeContext.Consumer>
    
}

export default Vote