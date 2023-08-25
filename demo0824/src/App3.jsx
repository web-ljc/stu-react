import React from "react";
/*

*/


export default class App extends React.Component {
    state = {
        list: []
    }
    handle = () => {
        this.timeSlice(501)
    }
    timeSlice = (times) => {
        // setTimeout 不是很流畅
        // requestAnimationFrame 每次浏览器渲染前执行
        // requestIdleCallback 在浏览器空闲时执行，不会阻塞优先级高的工作
        requestIdleCallback(() => {
            let minus = times > 100 ? 100 : times
            this.setState({
                list: [...this.state.list, ...new Array(minus).fill(Date.now())]
            }, () => {
                times -= minus
                times > 0 && this.timeSlice(times)
            })
        })
    }
    render() {
        console.log('App render');
        return (
            <div>
                <input type="text" />
                <button onClick={this.handle}>add1</button>
                <ul>
                    {
                        this.state.list.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))
                    }
                </ul>
            </div>
        )
    }
} 


