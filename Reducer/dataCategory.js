var dataCategory = (state = { NameProduct: [], data: [], addressFilter: "", disableFilter: false}, action) => {
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
        case 'RESET_FILTER':
            return {
                ...state,
                disableFilter: true
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
        case 'DEFAULT_FILTER':
            return {
                ...state,
                disableFilter: false
            }
        default:
            return state
    }
}

export default dataCategory;