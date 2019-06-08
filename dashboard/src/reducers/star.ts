import * as actions from '../actions';

import { Star } from '../config/types';
import { updateStorage } from '../utils/updateStorage';

type Action =
    | actions.GetStarsFulfilled
    | actions.SetViewingStarFulfilled
    | actions.SetShouldUpdateStar;

export interface StarStore {
    stars: Star[];
    isLoading: boolean;
    viewing: string;
    shouldUpdateStar: boolean;
}

const init: StarStore = {
    stars: [],
    viewing: localStorage.getItem('viewing') || '',
    isLoading: false,
    shouldUpdateStar: true,
};

export function starReducer(state = init, action: Action): StarStore {
    switch (action.type) {
        case actions.GET_STARS_FULFILLED:
            const { stars } = action;
            updateStorage('stars')(stars);
            return { ...state, stars, shouldUpdateStar: false };
        case actions.SET_SHOULD_UPDATE_STAR:
            return { ...state, shouldUpdateStar: true };
        case actions.SET_VIEWING_STAR_FULFILLED:
            updateStorage('viewing')(action.title);
            return { ...state, viewing: action.title };
    }
    return state;
}
