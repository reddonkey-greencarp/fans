import { ofType } from 'redux-observable';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { REMOVE_USER_START, RemoveUserStart, toggleProgress } from '../../actions';

import { checkToken, Epic, errHandler } from '../';

export const removeUserEpic: Epic<RemoveUserStart> = (action$, state$, { socket$ }) =>
    socket$.pipe(
        switchMap((socket) => {
            if (socket) {
                return action$.pipe(
                    ofType(REMOVE_USER_START),
                    tap(({ cid }) => {
                        const token = checkToken();
                        socket.emit('removeUser', { cid, token });
                    }),
                    map(() => toggleProgress(true)),
                    catchError((err) => errHandler(err))
                );
            }
            return EMPTY;
        }),
    );
