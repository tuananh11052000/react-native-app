var isDisplay = (state = { display: false }, action) => {
    switch (action.type) {
        case 'DISPLAY':
            return {
                ...state,
                display: true
            }
        case 'UNDISPLAY':
            return {
                ...state,
                data: false
            }
        default:
            return state
    }
}

export default isDisplay;