import { ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';

import { MOVE_USER_START, moveUserFulfilled, MoveUserStart, toggleProgress } from '../../actions';

import { Epic, errHandler } from '../';

export const moveUserEpic: Epic<MoveUserStart> = (action$, state$, { socket$ }) =>
    socket$.pipe(
        switchMap((socket) => {
            if (socket) {
                return action$.pipe(
                    ofType(MOVE_USER_START),
                    mergeMap((action) => {
                        const { cid, from, position, to } = action;
                        return of(
                            // Try to move, move back if failed
                            moveUserFulfilled(from, to, cid, position),
                            toggleProgress(true),
                        );
                    }),
                    catchError((err) => errHandler(err))
                );
            }
            return EMPTY;
        }),
    );
