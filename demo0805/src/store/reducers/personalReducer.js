// personalReducer
import * as TYPES from '../action-type'
const initial = {
    num: 100,
    info: null
}

export default (state = initial, action) => {
    state = {...state}

    switch (action.type) {
        case TYPES.PERSONAL_INFO:
            state.info = action.payload
            console.log(111111);
            break
        default:
    }

    return state
}