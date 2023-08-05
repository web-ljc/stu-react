/* 
    合并各个模块的reducer，最后创建出一个总reducer
    import {combineReducers} from 'redux'
    const reducer = combineReducers({
        vote: voteReducer,
        personal: personalReducer
    })
    + reducer:最后合并的总的reducer
    + 此时容器中的公共状态，会按照设置的成员名字，分模块进行管理
        state = {
            vote: {
                supNum: 10,
                oppNum: 0
            }
            personal: {}
        }
    + 基于 store.getState() 获取状态。 store.getState().vote.supNum
    
    + 派发的操作不需要改动，每一次派发后，都会去所有reducer进行逐一匹配【用派发的行为标识，和每个模块reducer中判断的行为标识进行比较】和谁匹配成功，就执行谁的逻辑，只要匹配成功都会执行
    + 事件池中的方法都会全部执行
*/
import {combineReducers} from 'redux'
import voteReducer from './voteReducer'
import personalReducer from './personalReducer'


const reducer = combineReducers({
    vote: voteReducer,
    personal: personalReducer
})

export default reducer


