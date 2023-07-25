import React from "react";
import {flushSync} from "react-dom";
// flushSync:可以刷新“updater更新队列”,也就是让修改状态的任务立即批处理一次
/*
    this.setState((prevState) => {
        // prevState:存储之前的状态值
        // return对象：就是我们想要修改的新状态值【支持修改部分状态】
        return {
            x:xxx
        }
    })
*/

class Demo5 extends React.Component {
    state = {
        x: 10,
        y: 5,
        z: 0
    }

    handle = () => {
        // 箭头函数this -- 实例
        let {x, y, z} = this.state
        // 同时修改多个值，只更新一次
        // this.setState({
        //     x: 100,
        //     y: 200,
        // }, () => {
        //     console.log('更新完毕X');
        // })
        this.setState({x: x+1})
        console.log(this.state); // 10/5/0
        flushSync(() => {
            this.setState({y: y+1})
            console.log(this.state); // 10/5/0
        }) // 在fushSync操作结束后，会立即“刷新”更新队列
        console.log(this.state); // 11/6/0
        this.setState({z: z+1})
        this.setState({z: z+2})
        console.log(this.state.z); // 0
        flushSync()
        console.log(this.state.z); // 2
        // 执行20次
        // for (let i = 0; i < 20; i++) {
        //     this.setState({
        //         x: this.state.x + 1
        //     })
        //     this.setState(prevState => { // 批处理：把函数依次执行，得到最后的处理结果
        //         return {
        //             x: prevState.x + 1
        //         }
        //     })
        //     flushSync()
        // }
    }

    // shouldComponentUpdate() {
    //     return false
    // }

    componentDidUpdate() {
        console.log('更新完了2');
    }

    render() {
        console.log('render');
        let {x, y, z} = this.state
        return <div>
            {x} - {y} - {z}
            <br />
            <button onClick={this.handle}>按钮</button>
        </div>
    }
}

export default Demo5


/*
    this.setState([partialState], [callback])
        - [partialState]: 支持部分状态更改
            this.setState({
                x: 100 // 不论总共有多少状态，我们只修改了x，其余的状态不动
            })
        - [callback]: 在状态更改/视图更新完毕后触发执行[只要执行了setState，callback一定会执行]
            + 发生在componentDidUpdate周期函数之后【componentDidUpdate会在任何状态更改以后触发执行；而回调函数方式，可以在指定状态更新后处理一些事情】
            + 特殊：即便我们基于 shouldComponetUpdate 阻止了状态/视图的更新，componentDidUpdate 函数周期肯定不执行，但设置的callback回调函数依然会被执行
        类似于Vue框架中的$nextTick
    
    在React18中，setState都是“异步操作”【不论是在哪执行，例如：合成时间、周期函数、定时器】
        + React18中有一套更新队列的机制
        + 基于异步操作，实现状态的批处理
        + 目的：实现状态的批处理【统一处理】
            + 减少视图的更新次数，降低渲染消耗的性能
            + 让更新的逻辑和流程更加清晰&稳健
        + 原理：利用了更新队列【updater】机制来处理的
            + 在当前相同的时间段内【浏览器此时可以处理的事情中】，遇到setState会立即放入到更新队列中
            + 此时状态/视图还未更新
            + 当所有的代码操作结束，会“刷新队列”【通知更新队列中的任务执行】：把所有放入的setState合并在一起执行，只触发一次视图更新
*/