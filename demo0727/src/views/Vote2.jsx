import React from "react";
import ThemeContext from "../ThemeContext"; // 导入上下文对象

/*
    上下文
        1. 创建一个上下文对象，来管理上下文中信息
        2. 让祖先组件Vote，具备状态和修改状态的方法，同时还需要把这些信息，存储到上下文中
            - 基于上下文中，提供的Provider组件，用来：
                - 向上下文中存储信息：value属性指定的值就是要存储的信息
                - 当祖先组件更新，render重新执行，会把最新的状态值，再次存储到上下文对象中
                ```js
                    const ThemeContext = React.createContext()

                    <ThemeContext.Provider
                        value={{
                            supNum,
                            oppNum,
                            handle: this.handle
                        }}
                    >
                        <Parent />
                    </ThemeContext.Provider>
                ```
        3. 在后代组件中，需要获取上下文中的信息
            - VoteMain：获取信息绑定即可
            - VoteFooter：获取信息，把获取的函数（修改组件状态的函数），在点击时执行
            - 方案一
                1. 导入创建的上下文对象
                2. 给类组件设置私静态私有属性 contextType=上下文对象
                    + 在this.context属性上，存储了上下文的所有信息
                3. 从this.context中获取需要的信息

                ```js
                    static contextType = ThemeContext
                    const { supNum, oppNum } = this.context

                    <ThemeContext.Consumer>
                        {context => {
                            return <Parent />
                        }}
                    </ThemeContext.Consumer>
                ```
*/

class Vote extends React.Component {
    state = {
        supNum: 10,
        oppNum: 5,
    }
    
    handle = type => {
        const {supNum, oppNum} = this.state
        if (type === 'sup') {
            this.setState({ supNum: supNum + 1 })
            return
        }
        this.setState({ oppNum: oppNum + 1 })
    }

    render() {
        const {supNum, oppNum} = this.state
        // 2. 基于上下文中，提供的Provider组件，用来：
        //    - 向上下文中存储信息：value属性指定的值就是要存储的信息
        //    - 当祖先组件更新，render重新执行，会把最新的状态值，再次存储到上下文对象中
        return <ThemeContext.Provider
                value={{
                    supNum,
                    oppNum,
                    handle: this.handle
                }}
            >
            <div>
                <div className="header">
                    <h2>{this.props.title}</h2>
                    <span>{supNum + oppNum}</span>
                </div>
                <VoteMain />
                <VoteFooter handle={this.handle} />
            </div>
        </ThemeContext.Provider>
    }
}

class VoteMain extends React.Component {
    static contextType = ThemeContext

    render() {
        const { supNum, oppNum } = this.context
        console.log(this.context);
        let ratio = '--',
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
}

class VoteFooter extends React.PureComponent {
    render() {
        return <ThemeContext.Consumer>
            {context => {
                const {handle} = context
                return  <div className="footer">
                    <button onClick={handle.bind(null, 'sup')}>
                        agree
                    </button>
                    <button onClick={handle.bind(null, 'opp')}>
                        reject
                    </button>
                </div>
            }}
        </ThemeContext.Consumer>
    }
}

export default Vote