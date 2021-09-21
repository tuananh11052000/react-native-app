var dataTrans = (state = { data: [], }, action) => {
    switch (action.type) {
        case 'SAVE_DATA_TRANS':
            return {
                ...state,
                data: action.data
            }
        case 'RESET_DATA_TRANS':
            return {
                ...state,
                data: [],
            }
        default:
            return state
    }


}

export default dataTrans;