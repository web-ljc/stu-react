import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {getAllTaskListSync, removeTask} from '../store2/features/taskSlice'

const Vote = (props) => {
    // 获取公共状态和派发的方法
    let {taskList} =  useSelector(state => state.task),
        dispatch = useDispatch()

    useEffect(() => {
        if (!taskList) {
            dispatch(
                getAllTaskListSync()
            )
        }
    }, [])

    const handler = () => {
        dispatch(removeTask('11111122222'))
    }

    return (
        <div>
            <div className="header">
                <h2>{props.title}</h2>
                <span onClick={handler}>{'supNum'}</span>
                <span onClick={handler}>{'oppNum'}</span>
            </div>
        </div>
    )
} 




export default Vote
