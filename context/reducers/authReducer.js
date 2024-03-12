const initialState = {
    isLoggedIn: false,
    userId: null, 
    token: null, 
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state, 
                isLoggedIn: true, 
                userId: action.payload.userId,
                token: action.payload.token
            };
        case 'LOGOUT':
            return {
                ...state, 
                isLoggedIn: false,
                userId: null, 
                token: null
            };
        default:
            return state;
    }
};

export default authReducer;
