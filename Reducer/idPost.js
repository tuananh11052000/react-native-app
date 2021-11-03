var idPost = (state = { idPost: "", }, action) => {
    switch (action.type) {
        case 'SAVE_ID_POST':
            return {
                ...state,
                idPost: action.idPost
            }
        case 'RESET_DATA_TRANS':
            return {
                ...state,
                idPost: ""
            }
        default:
            return state
    }


}

export default idPost;