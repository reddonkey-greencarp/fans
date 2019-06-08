import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, mergeMap, startWith } from 'rxjs/operators';

import { Epic, errHandler } from '../';

import { enqueueSnackbar, login, LOGIN_START, LoginStart, toggleProgress, } from '../../actions';

export const loginEpic: Epic<LoginStart> = (action$) =>
    action$.pipe(
        ofType(LOGIN_START),
        mergeMap(() =>
            of('').pipe(
                mergeMap(() => {
                    const token = '123';
                    return of(
                        login(token),
                        enqueueSnackbar('已成功登录！', { variant: 'success' }),
                        toggleProgress(),
                    );
                }),
                startWith(toggleProgress(true)),
                catchError((err) => errHandler(err)),
            )
        ),
        catchError((err) => errHandler(err)),
    );
