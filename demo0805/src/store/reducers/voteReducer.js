// voteReducer
import * as TYPES from '../action-type'

const initial = {
    supNum: 10,
    oppNum: 5,
    num: 0
}

export default (state = initial, action) => {
    state = {...state}

    switch (action.type) {
        case TYPES.VOTE_SUP:
            state.supNum++
            console.log(11111133333);
            break
        case TYPES.VOTE_OPP:
            state.oppNum++
            break
        default:
    }

    return state
}