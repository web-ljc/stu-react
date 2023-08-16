import React from "react"
import {observable, action} from 'mobx'
import {observer} from 'mobx-react'

class Store {
    @observable num = 10

    @action
    change() {
        this.num++
    }
}
let store = new Store

// @observer
// class Demo extends React.Component {
//     render() {
//         return <div>
//             <span>{store.num}</span>
//             <br />
//             <button onClick={() => store.change()}>按钮</button>
//         </div>
//     }
// }

// 函数组件无法使用装饰器的语法，但是可以执行observer，把组件传递进去
const Demo = observer(() => {
    return <div>
        <span>{store.num}</span>
        <br />
        <button onClick={() => store.change()}>按钮</button>
    </div>
})

export default Demo