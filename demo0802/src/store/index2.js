/* 
    合并各个模块的reducer，最后创建出一个总reducer
*/
import {createStore} from 'redux'
import reducer from './reducers'

const store = createStore(reducer)

export default store