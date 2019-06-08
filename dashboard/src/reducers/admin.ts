import * as actions from '../actions';

type Action =
    actions.Login
    | actions.Logout;

export interface AdminStore {
    token: string;
    isLoading: boolean;
    isScanning: boolean;
    key: string;
    firstLoad: boolean;
}

const token = localStorage.getItem('token') || '';

const init: AdminStore = {
    token,
    isLoading: false,
    isScanning: false,
    key: '',
    firstLoad: true,
};

export function adminReducer(state = init, action: Action): AdminStore {
    switch (action.type) {
        case actions.LOGIN:
            const { token } = action;
            localStorage.setItem('token', token);
            return { ...state, token };
        case actions.LOGOUT:
            localStorage.removeItem('token');
            return { ...state, token: '' };
    }
    return state;
}
