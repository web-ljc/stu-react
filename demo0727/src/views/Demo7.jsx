import React, { useEffect, useState } from "react";
import {flushSync} from 'react-dom'

/*
    useEffect
        - 必须在函数的最外层上下文中调用，不能把其嵌入到条件判断、循环等操作语句中
    
*/

const queryData = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([10, 20, 30])
        }, 1000)
    })
}

const Demo = () => {
    const [num, setNum] = useState(0)

    const handle = () => {
        setNum(num+1)
    }

    // 必须在函数的最外层上下文中调用，不能把其嵌入到条件判断、循环等操作语句中
    // if(num > 5) {
    //     useEffect(() => {
    //         console.log('ok');
    //     })
    // }

    useEffect(() => {
        if(num > 5) {
            console.log('ok');
        }
    }, [num])

    // useEffect如果设置了返回值，则返回值必须是一个函数【等表组件销毁时触发】，callback经过async的修饰，返回的是一个promise实例，不符合要求
    // useEffect(async () => {
    //     let data = await queryData()
    //     console.log('success', data);
    // }, [])

    // useEffect(() => {
    //     queryData().then(data => {
    //         console.log('success', data);
    //     })
    // }, [])

    useEffect(() => {
        const next = async () => {
            let data = await queryData()
            console.log('success', data);
        }
        next()
    }, [])
 

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