/*
    vote板块要派发的行为对象管理
        voteAction包含好多方法，每一个方法执行，都返回要派发的行为对象
    目前来看，此工程化步骤，不仅没好处，而且更麻烦了
    此操作的意义：创建actionCreator，接下来处理react-redux的时候，非常有用
*/
import * as TYPES from '../action-type'

const voteAction = {
    support() {
        return {
            type: TYPES.VOTE_SUP
        }
    },
    oppose() {
        return {
            type: TYPES.VOTE_OPP
        }
    }
}

export default voteAction