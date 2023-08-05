import React, { useState, useContext } from "react";
import ThemeContext from "../ThemeContext";
import { useEffect } from "react";

/*
*/

const Vote = (props) => {
    const {store2} = useContext(ThemeContext)
    // 2. 获取store状态
    const {supNum, oppNum} = store2.getState().vote

    // 3. 组件第一次渲染完毕后，把让组件更新的方法，放在STORE的事件池中
    let [num, setNum] = useState(0)
    const update = () => setNum(num+1)

    useEffect(() => {
        // let unsubscribe = store.subscribe(让组件更新的方法)
        //  + 把让组件更新的方法，放在STORE的事件池中
        //  + 返回的unsubscribe方法执行，可以把刚才放入到事件池的方法移除掉
        let unsubscribe = store2.subscribe(update)
        return () => {
            unsubscribe() // 在上一次组件释放的时候，把上次放在事件池中的方法移除
        }
    }, [num]) // 每一次组件更新，把最新创建的update放入事件池

    // 值永远不同
    let [_, setNum2] = useState(0)
    useEffect(() => {
        store2.subscribe(() => {
            setNum2(+new Date())
        })
    }, [])

    return (
        <div>
            <div className="header">
                <h2>{props.title}</h2>
                <span>{supNum + oppNum}</span>
            </div>
            <VoteMain />
            <VoteFooter />
        </div>
    )
}

class VoteFooter extends React.Component {
    static contextType = ThemeContext

    render() {
        const {store2} = this.context
        
        return (
            <div className="footer">
                {/* 5. 派发任务 */}
                <button onClick={store2.dispatch.bind(null, {type: 'VOTE_SUP'})}>
                    agree
                </button>
                <button onClick={store2.dispatch.bind(null, {type: 'VOTE_OPP'})}>
                    reject
                </button>
            </div>
        )
    }
}

class VoteMain extends React.Component {
    static contextType = ThemeContext

    render() {
        // 2. 获取公共store状态信息做绑定
        const {store2} = this.context
        const {supNum, oppNum} = store2.getState().vote

        let ratio =  '--',
            total = supNum + oppNum;
        if (total > 0) ratio = (supNum / total * 100).toFixed(2) + '%'

        return (
            <div className="main">
                <p>支持{supNum}人</p>
                <p>反对{oppNum}人</p>
                <p>支持比率 {ratio}</p>
            </div>
        )
    }

    componentDidMount() {
        // 3. 组件第一次渲染完毕，让组件可以更新的方法，基于store.subscribe放到公共容器的事件池中
        const {store2} = this.context
        store2.subscribe(() => {
            this.forceUpdate()
        })
    }
}

export default Vote