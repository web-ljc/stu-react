import React, { useEffect, useLayoutEffect, useState } from "react";
import {flushSync} from 'react-dom'

/*
    useLayoutEffect
        - 其函数签名与useEffect相同，但他会在所有的DOM变更之后同步调用effect
        - 可以使用它来读取DOM布局并同步触发重新渲染
        - 在浏览器执行绘制之前，useLayoutEffect内部的更新计划将被同步刷新
        - 尽可能使用标准的useEffect以避免阻塞视觉更新
    
*/

const Demo = () => {
    const [num, setNum] = useState(0)

    // useEffect(() => {
    //     if (num === 0) {
    //         setNum(10)
    //     }
    // }, [num])

    /*
        useLayoutEffect 会阻止浏览器渲染真实DOM，优先执行Effect链表中的callback
        useEffect 不会阻塞浏览器渲染真实DOM，在渲染真实DOM的同时，去执行Effect链表中的callback
            - useLayoutEffect设置的callback要优先于useEffect去执行
            - 在两者设置的callback中，依然可以获取DOM元素【原因：真实DOM已经创建了，区别只是浏览器是否渲染】
            - 如果在callback函数中又修改了状态值【视图又要更新】
                + useEffect：浏览器肯定是把第一次的真实已绘制了，再去渲染第二次真实DOM
                + useLayoutEffect: 浏览器是把两次真实DOM的渲染，合并一起渲染的

        视图更新的步骤：
            第一步：基于babel-preset-react-app把JSX编译为createElement格式
            第二步：把createElement执行，创建出virtualDOM
            第三步：基于root.render 方法把virtualDOM变为真实DOM对象【DOM-DIFF】
                - useLayoutEffect阻塞第四步操作，先去执行Effect链表中的方法【同步操作】
                - useEffect第四部操作和Effect链表中的方法执行，是同时进行的【异步操作】
            第四步：浏览器渲染和绘制真实DOM对象
    */
    useLayoutEffect(() => {
        console.log('useLayoutEffect'); // 第一个输出
        // if (num === 0) {
            //     setNum(10)
            // }
        }, [num])
        
    useEffect(() => {
        console.log('useEffect'); // 第二个输出
    })
 

    return (
        <div className="demo">
            <p style={{
                color: num === 0 ? 'red' : 'green'
            }}>{num}</p>
            <button onClick={() => setNum(num+1)}>
                add
            </button>
        </div>
    )
}

export default Demo