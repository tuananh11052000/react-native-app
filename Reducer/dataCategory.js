var dataCategory = (state = { NameProduct: [], data: [], addressFilter: ""}, action) => {
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
        case 'SAVE_ADDRESS_FILTER':
            return {
                ...state,
                addressFilter: action.addressFilter
            }
        case 'RESET_ADDRESS_FILTER':
            return {
                ...state,
                addressFilter: "",
            }
        case 'RESET_NAMEPRODUCT':
            return {
                ...state,
                NameProduct: [],
            }
        case 'RESET_DATA':
            return {
                ...state,
                data: [],
            }
        default:
            return state
    }
}

export default dataCategory;