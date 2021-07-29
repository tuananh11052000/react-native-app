var infoPost = (state = { TypeAuthor: "", NameAuthor: "", address: "", title: "", node: "", accountID: "", NameProduct: "", image: "" }, action) => {
    switch (action.type) {
        case 'CONFIRM_ADDRESS':
            return {
                ...state,
                address: action.address
            };
        case 'GET_NAME':
            return {
                ...state,
                NameProduct: action.NameProduct
            }
        case 'GET_TITLE':
            return {
                ...state,
                title: action.title
            }
        case 'GET_NOTE':
            return {
                ...state,
                note: action.note
            }
        default:
            return state
    }
}

export default infoPost;