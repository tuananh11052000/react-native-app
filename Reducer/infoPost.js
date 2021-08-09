var infoPost = (state = {
    TypeAuthor: "", address: "", title: "", note: "", NameProduct: "", image: []
}, action) => {
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
        case 'GET_IMG':
            return {
                ...state,
                image: action.image
            }
        case 'RESET':
            return {
                ...state,
                image: [],
                title: "",
                note: ""
            }
        default:
            return state
    }
}

export default infoPost;