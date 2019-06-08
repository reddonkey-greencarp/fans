import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, mergeMap, startWith } from 'rxjs/operators';

import { enqueueSnackbar, getStarsStart, SET_SCHEDULE, SetSchedule, setShouldUpdateStar, toggleProgress } from '../../actions';

import { API } from '../../config/consts';

import { checkToken, customError, Epic, errHandler } from '../';

export const setScheduleEpic: Epic<SetSchedule> = (action$) =>
    action$.pipe(
        ofType(SET_SCHEDULE),
        mergeMap(({ schedule }) => {
            const token = checkToken();
            return ajax.put(`${API}/star/`, JSON.stringify(schedule), {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }).pipe(
                mergeMap(({ response: res }) => {
                    if (res.type === 'success') {
                        return of(
                            setShouldUpdateStar(),
                            enqueueSnackbar('设置活动日程安排成功！', { variant: 'success' }),
                            getStarsStart(),
                            toggleProgress(),
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
