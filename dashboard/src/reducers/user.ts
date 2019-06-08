import * as actions from '../actions';

import { User, Step } from '../config/types';

import { updateStorage } from '../utils/updateStorage';

const update = updateStorage('users');

type Action =
    | actions.AddCommentFulfilled
    | actions.DeselectUser
    | actions.GetUsersFulfilled
    | actions.MoveUserFulfilled
    | actions.RemoveUserFulfilled
    | actions.RemoveCommentFulfilled
    | actions.SelectUser
    | actions.SetSteps
    | actions.AllocateOneFulfilled
    | actions.AllocateAllFulfilled;

export interface UserStore {
    users: User[];
    selected: string[];
    steps: Step[];
}

const init: UserStore = {
    users: [],
    selected: [],
    steps: [0, 1],
};

export function userReducer(state = init, action: Action): UserStore {
    switch (action.type) {
        case actions.GET_USERS_FULFILLED: {
            const { users } = action;
            update(users);
            return { ...state, users };
        }
        case actions.SELECT_USER:
            return { ...state, selected: [...new Set(state.selected.concat(action.cid))] };
        case actions.DESELECT_USER:
            return { ...state, selected: state.selected.filter((cid) => !action.cid.includes(cid)) };
        case actions.REMOVE_USER_FULFILLED: {
            const users = state.users.filter(({ _id }) => !action.cid.includes(_id));
            const selected = state.selected.filter((cid) => !action.cid.includes(cid));
            update(users);
            return { ...state, users, selected };
        }
        case actions.MOVE_USER_FULFILLED: {
            const users = state.users.map((user) => user._id === action.cid ? { ...user, step: action.to } : user);
            update(users);
            return { ...state, users };
        }
        case actions.SET_STEPS:
            return { ...state, steps: [0, 1] };
    }
    return state;
}
