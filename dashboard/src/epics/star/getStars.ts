import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, mergeMap, startWith } from 'rxjs/operators';

import {
    enqueueSnackbar,
    GET_STARS_START,
    getStarsFulfilled,
    setViewingStarFulfilled,
    toggleProgress
} from '../../actions';

import { customError, Epic, errHandler } from '../';

export const getStarsEpic: Epic = (action$, state$, { localStorage }) =>
    action$.pipe(
        ofType(GET_STARS_START),
        mergeMap(() => {
            const stars = localStorage.getItem('stars');
            const viewing = localStorage.getItem('viewing');
            const { shouldUpdateStar } = state$.value.star;
            if (stars && !shouldUpdateStar) {
                return of(
                    getStarsFulfilled(JSON.parse(stars)),
                    enqueueSnackbar('成功获取明星信息', { variant: 'success' }),
                );
            }
            return of({
                type: 'success',
                data: [{
                    begin: +new Date(),
                    end: +new Date(),
                    name: '杨超越',
                    _id: '1',
                    stop: +new Date(),
                    total: 123,
                    interview: [],
                }]
            }).pipe(
                mergeMap((res) => {
                    if (res.type === 'success') {
                        const data = res.data.sort((prev, next) => prev.begin - next.begin);
                        const newViewing = viewing ? viewing : data.slice(-1)[0] ? data.slice(-1)[0].name : '';
                        return of(
                            getStarsFulfilled(data),
                            setViewingStarFulfilled(newViewing),
                            enqueueSnackbar('成功获取明星信息', { variant: 'success' }),
                            toggleProgress()
                        );
                    }
                    throw customError(res);
                }),
                startWith(toggleProgress(true)),
                catchError((err) => errHandler(err)),
            );
        }),
        catchError((err) => errHandler(err)),
    );
