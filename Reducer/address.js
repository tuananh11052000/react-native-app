var address = (state = { province: "", district: "", commune: "", addressDetail: "" }, action) => {
    switch (action.type) {
        case 'CONFIRM_ADDRESS':
            return {
                ...state,
                province: action.province,
                district: action.district,
                commune: action.commune,
                addressDetail: action.addressDetail
            };
        default:
            return state
    }
}

export default address;