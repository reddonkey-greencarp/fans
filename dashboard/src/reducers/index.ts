import { combineReducers } from 'redux';
import { adminReducer, AdminStore } from './admin';
import { componentReducer, ComponentStore } from './component';
import { starReducer, StarStore } from './star';
import { userReducer, UserStore } from './user';

export interface StoreState {
    component: ComponentStore;
    admin: AdminStore;
    user: UserStore;
    star: StarStore;
}

export const reducers = combineReducers({
    user: userReducer,
    component: componentReducer,
    star: starReducer,
    admin: adminReducer,
});
