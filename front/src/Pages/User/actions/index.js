export const register = user => ({
    type: 'REGISTER',
    user,
});

export const login = user => ({
    type: 'LOGIN',
    user,
});