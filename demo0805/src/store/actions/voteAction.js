/*
    vote板块要派发的行为对象管理
        voteAction包含好多方法，每一个方法执行，都返回要派发的行为对象
    目前来看，此工程化步骤，不仅没好处，而且更麻烦了
    此操作的意义：创建actionCreator，接下来处理react-redux的时候，非常有用
*/
import * as TYPES from '../action-type'

const delay = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, interval)
    })
}

/*
    在不使用任何中间件的情况下，actionCreator对象中，是不支持异步操作的。
    我们要保证方法执行立马返回标准的action对象
    真实项目中，需要异步操作，在派发任务时，需要先向服务器请求，拿到数据后再进行派发
    需要中间价来处理 redux-thunk

*/
const voteAction = {
    support() {
        return async (dispatch) => {
            await delay()
            return dispatch({
                type: TYPES.VOTE_SUP
            })
        }
    },
    async oppose() {
        await delay(2000)
        return {
            type: TYPES.VOTE_OPP
        }
    },
    oppose2() {
        return {
            type: TYPES.VOTE_OPP
        }
    }
}

export default voteAction