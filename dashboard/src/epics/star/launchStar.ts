import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, mergeMap, startWith } from 'rxjs/operators';

import { enqueueSnackbar, getStarsStart, LAUNCH_STAR, LaunchStar, setShouldUpdateStar, toggleProgress } from '../../actions';

import { API } from '../../config/consts';

import { checkToken, customError, Epic, errHandler } from '../';

export const launchStarsEpic: Epic<LaunchStar> = (action$) =>
    action$.pipe(
        ofType(LAUNCH_STAR),
        mergeMap(({ info }) => {
            const token = checkToken();
            return ajax.post(`${API}/star/`, JSON.stringify(info), {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }).pipe(
                mergeMap(({ response: res }) => {
                    if (res.type === 'success') {
                        return of(
                            setShouldUpdateStar(),
                            enqueueSnackbar('已成功发起！', { variant: 'success' }),
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
