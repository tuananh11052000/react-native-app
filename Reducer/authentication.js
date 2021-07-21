var auth = (state = { token: "null", isSignout: true, PhoneNumber: "" }, action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return {
                ...state,
                isSignout: false,
                userToken: action.token,
                PhoneNumber: action.PhoneNumber
            };
        case 'SIGN_OUT':
            return {
                ...state,
                isSignout: true,
                userToken: null,
                PhoneNumber: ""
            };
        default:
            return state
    }
}

export default auth;