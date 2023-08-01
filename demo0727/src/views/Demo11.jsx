import React, { useState, useMemo } from "react";

/*
    函数组件的每次更新，都是把函数重新执行
        - 产生一个新的闭包
        - 内部的代码也要重新执行一遍
    - 问题
        - 如果我们修改支持/反对数，视图更新的时候，可以让此逻辑重新计算
        - 如果我们是修改其它状态值，视图更新了，此逻辑没必要再重新执行了。【如果此逻辑执行的时间比价长，一定是影响视图更新速度】
    - 诉求：在函数每一次重新执行时，如果依赖的状态值没有发生变化，我们操作逻辑不该去执行。当依赖值发生改变，再去执行

    let xxx = useMemo(callback, [dependencies])
        - 第一渲染组件的时候，callback会执行
        - 后期只有依赖的状态值发生改变，callback才会再执行
        - 每一次会把callback执行的返回结果赋值给xxx
        - useMemo具备“计算缓存”效果，在依赖的状态值没有发生改变，callback没有触发执行的时候，xxx获取的是上一次计算出来的结果。和Vue的计算属性非常相似
*/

const Vote = (props) => {
    const [supNum, setSupNum] = useState(10),
        [oppNum, setOppNum] = useState(10),
        [x, setX] = useState(0)

    // let total = supNum + oppNum,
    //     ratio = '--'
    // if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
    
    let ratio = useMemo(() => {
        console.log('ok');
        let total = supNum + oppNum,
            ratio = '--'
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'
        return ratio
    }, [supNum, oppNum])
    
    return (
        <div>
            <div className="header">
                <h2>{props.title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <div className="main">
                <p>支持{supNum}人</p>
                <p>反对{oppNum}人</p>
                <p>比率：{ratio}</p>
                <p>x{x}人</p>
            </div>
            <div className="footer">
                <button onClick={() => {setSupNum(supNum + 1)}}>
                    agree
                </button>
                <button onClick={() => {setOppNum(oppNum + 1)}}>
                    reject
                </button>
                <button onClick={() => {setX(x + 1)}}>
                    other
                </button>
            </div>
        </div>
    )
}

Vote.defaultProps = {
    title: 'test title'
}

export default Vote