var dataCategory = (state = { NameProduct: [], data: []}, action) => {
    switch (action.type) {
        case 'GET_NAMEPRODUCT':
            return {
                ...state,
                NameProduct: action.NameProduct
            }
        case 'SET_DATA':
            return {
                ...state,
                data: action.data
            }
        case 'RESET_NAMEPRODUCT':
            return {
                ...state,
                NameProduct: [],
            }
        default:
            return state
    }
}

export default dataCategory;