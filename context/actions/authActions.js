export const Login = (userId, token) => ({
    type: 'LOGIN',
    payload: { userId, token } 
});

export const Logout = () => ({
    type: 'LOGOUT'
});
