var auth = (state = { token: '', isSignout: true, PhoneNumber: "", isLogin: false }, action) => {
    switch (action.type) {
        case 'UPDATE_AUTH'://cap nhat token neu no duoc luu tren thiet bi
            return {
                ...state,
                isLogin: true,
                token: action.tokenAccess,
                isSignout: false
            }
        case 'SIGN_IN':
            return {
                ...state,
                isSignout: false,
                token: action.token,
                PhoneNumber: action.PhoneNumber
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignout: true,
                token: null,
                isLogin: false,
                PhoneNumber: ""
            };
        default:
            return state
    }
}

export default auth;