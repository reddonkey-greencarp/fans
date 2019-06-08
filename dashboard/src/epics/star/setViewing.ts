import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import {
    enqueueSnackbar,
    getUsersStart,
    SET_VIEWING_STAR_START,
    SetViewingStarStart
} from '../../actions';

import { Epic } from '../';

export const setViewingEpic: Epic<SetViewingStarStart> = (action$, state$) =>
    action$.pipe(
        ofType(SET_VIEWING_STAR_START),
        mergeMap(({ title }) => {
            const { viewing } = state$.value.star;
            if (viewing === title) {
                return of(
                    enqueueSnackbar('设置成功', { variant: 'success' }),
                );
            }
            return of(
                getUsersStart(title),
                enqueueSnackbar('设置成功，正在获取候选人信息', { variant: 'success' }),
            );
        }),
    );
