/* TASK板块的切片: 包含reducer & action-creator */
import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    // 切片名字
    name: 'task',
    // 切片对应reducer中的初始状态
    initialState: {
        taskList: null
    },
    // 编写不同业务逻辑，对公共状态的更改
    reducers: {
        getAllTaskList(state, action) {
            // state:redux中的公共状态信息【基于immer库管理，无需自己再克隆了】
            // action:派发的行为对象，无需考虑行为标识问题，传递的其他信息，都是以action.payload传递
            state.taskList = action.payload
        },
        removeTask(state, {payload}) {
            let taskList = state.taskList
            if (!Array.isArray(taskList)) return
            state.taskList = taskList.filter(item => {
                return +item.id !== +payload
            })
        },
        updateTask(state, {payload}) {
            let taskList = state.taskList
            if (!Array.isArray(taskList)) return
            state.taskList = taskList.map(item => {
                if (+item.id === +payload) {
                    item.state = 2
                }
                return item
            })
        }
    }
})

// 从切片中获取actionCreator：此处解构的方法和上面reducers中的方法，仅仅是函数名相同；方法执行返回要派发的行为对象；后期可以基于disptach进行任务派发即可
export const {getAllTaskList, removeTask, updateTask} = taskSlice.actions
// console.log(getAllTaskList([])); {type: 'task/getAllTaskList', payload: []}

// 实现异步派发【redux-thunk】
const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}
export const getAllTaskListSync = () => {
    return async (dispatch) => {
        let list = await delay()
        return dispatch(getAllTaskList(list))
    }
}

// 从切片中获取reducer
export default taskSlice.reducer
