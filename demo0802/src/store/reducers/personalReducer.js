// personalReducer
const initial = {
    num: 100,
    info: null
}

export default (state = initial, action) => {
    state = {...state}

    switch (action.type) {
        case 'VOTE_SUP':
            state.info = action.payload
            console.log(111111);
            break
        default:
    }

    return state
}