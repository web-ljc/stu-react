import React, { useEffect, useState } from "react";
import {flushSync} from 'react-dom'

/*
    useEffect：在函数组件中，使用生命周期函数
        + useEffect(callback)
            + 第一次渲染完毕后，执行callback，等价于componentDidMount
            + 在组件每一次更新完毕后，执行callback，等价于componentDidUpdated  

        + useEffect(callback, [])
            + 只有第一次渲染完毕后，才会执行callback，等价于componentDidMount
            + 每一次视图更新完毕后，callback不执行

        + useEffect(callback, [依赖的状态（多个状态）])
            + 只有第一次渲染完毕后，才会执行callback，等价于componentDidMount
            + 当依赖的状态值（或者多个状态中的一个）发生改变，执行callback
            + 当依赖的状态值没有改变，在组件更新的时候，callback不执行

        useEffect(() => {
            return () => {
                // 返回的小函数，会在组件释放的时候执行
                // 如果组件更新，会把上一次返回的小函数执行【可以理解为上一簇渲染的组件释放了】
            }
        })
    
*/

const Demo = () => {
    const [num, setNum] = useState(0)
    const [num2, setNum2] = useState(0)

    const handle = () => {
        setNum(num+1)
    }

    useEffect(() => {
        // 获取最新状态值
        console.log('ok1', num2);
        // console.log(document.querySelector('.demo'))
    })
    
    useEffect(() => {
        // 获取最新状态值
        console.log('ok2', num);
    }, [])

    useEffect(() => {
        // 获取最新状态值
        setNum2(num2+1)
        console.log('ok3', num);
    }, [num])

    useEffect(() => {
        return () => {
            // 获取的是上一次的状态值
            console.log('ok4', num);
        }
    })

    return (
        <div className="demo">
            <p>{num}</p>
            <button onClick={handle}>
                add
            </button>
        </div>
    )
}

export default Demo