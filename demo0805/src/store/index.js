/* 
    合并各个模块的reducer，最后创建出一个总reducer
    applyMiddleware：中间件
*/
import {createStore, applyMiddleware} from 'redux'
import reduxLogger from 'redux-logger'
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'
import reducer from './reducers'


const store = createStore(
    reducer,
    applyMiddleware(reduxLogger, reduxThunk, reduxPromise )
)

export default store