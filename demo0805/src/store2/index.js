import {configureStore} from '@reduxjs/toolkit'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import taskSliceReducer from './features/taskSlice'

const store = configureStore({
    // 指定reducer，【类似于reducer的合并，最后会按照指定的模块，去管理各板块下的状态】
    reducer: {
        // 按模块管理各个切片
        task: taskSliceReducer
    },
    // 使用中间价，如果我们不指定任何中间件，则默认集成了reduxThunk，但是一但设置，会整体替换默认值，需要手动指定thunk中间件
    middleware: [reduxLogger, reduxThunk]
})

export default store