import React, { useCallback, useState } from "react";
import VoteFooter from './VoteFooter'
import VoteMain from './VoteMain'

/*
    useCallback不能乱用
        - 如果没有设置任何依赖，则函数永远是在第一次组件渲染，产生的闭包中创建的。
        - 函数中的用到的信息【向上级上下文中找】永远是第一次闭包中的信息
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
        <div>
            <div className="header">
                <h2>{props.title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <VoteMain supNum={supNum} oppNum={oppNum} />
            <VoteFooter handle={handle} />
        </div>
    )
}

export default Vote