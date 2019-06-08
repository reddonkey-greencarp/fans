import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, mergeMap, startWith } from 'rxjs/operators';

import {
    enqueueSnackbar,
    GET_USERS_START,
    getUsersFulfilled,
    GetUsersStart,
    setViewingStarFulfilled,
    toggleProgress
} from '../../actions';

import { User, Step } from '../../config/types';

import { customError, Epic, errHandler } from '../';

export const getUsersEpic: Epic<GetUsersStart> = (action$, state$, { localStorage }) =>
    action$.pipe(
        ofType(GET_USERS_START),
        mergeMap((action) => {
            const { title, step } = action;
            const users = localStorage.getItem('users');
            const viewing = localStorage.getItem('viewing');
            if (users && title === viewing) {
                let data = JSON.parse(users);
                if (step) data = data.filter((user: User) => user.step === step);
                return of(
                    getUsersFulfilled(data),
                    enqueueSnackbar('成功获取用户信息', { variant: 'success' }),
                );
            }
            return of({
                type: 'success',
                data: [...new Array(20)].map((i, j) => ({
                    _id: `${j}`,
                    name: `user${j}`,
                    answer: '123',
                    step: 0 as Step
                }))
            }).pipe(
                mergeMap((res) => {
                    if (res.type === 'success') {
                        return of(
                            getUsersFulfilled(res.data),
                            setViewingStarFulfilled(title),
                            enqueueSnackbar('成功获取用户信息', { variant: 'success' }),
                            toggleProgress(),
                        );
                    }
                    throw customError(res);
                }),
                startWith(toggleProgress(true)),
                catchError((err) => errHandler(err)),
            );
        }),
        catchError((err) => errHandler(err))
    );
