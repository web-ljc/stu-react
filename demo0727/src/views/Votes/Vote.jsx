import React from "react";
import VoteFooter from './VoteFooter'
import VoteMain from './VoteMain'

/*
    - 单项数据流
        - 属性传递方向是单向的
            + 父组件可以基于属性把信息传递给子组件
            + 子组件无法基于属性给父组件传递信息，但可以把父组件传递的方法执行，从而实现子改父
        - 关于生命周期的延续
            + 组件第一次渲染

   父子组件通信
    1. 以父组件为主导，基于“属性”实现通信
        + 原因：只有父组件可以调用子组件，此时可以基于属性，把数据传递给子组件
        - 父组件给子组件传递属性：可以基于属性props
        - 子组件更改父组件数据：可以基于属性props传递方法，子组件执行方法
        - 父组件传递HTML给子组件：可以基于属性中的children【插槽】
    
    2. 父组件基于ref获取子组件的实例【或者子组件基于useImperativeHandle暴露的数据和方法】
        - 父组件调用子组件：可设置ref获取子组件的实例，状态和方法

*/

class Vote extends React.Component {
    state = {
        supNum: 10,
        oppNum: 5,
    }
    
    handle = (type) => {
        const {supNum, oppNum} = this.state
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 })
            return
        }
        this.setState({ oppNum: oppNum + 1 })
    }

    render() {
        const {supNum, oppNum} = this.state
        return (
            <div>
                <div className="header">
                    <h2>{this.props.title}</h2>
                    <span>{supNum + oppNum}</span>
                </div>
                <VoteMain supNum={supNum} oppNum={oppNum} />
                <VoteFooter handle={this.handle} />
            </div>
        )
    }
}

export default Vote