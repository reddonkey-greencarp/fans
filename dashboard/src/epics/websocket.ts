import { Action } from 'redux';
import { ofType } from 'redux-observable';
import { EMPTY, Observable } from 'rxjs';
import { ignoreElements, switchMap, tap } from 'rxjs/operators';

import { VariantType } from 'notistack';

import {
    addCommentFulfilled,
    enqueueSnackbar,
    removeUserFulfilled,
    removeCommentFulfilled,
    setShouldUpdateStar,
    SOCKET_START,
    toggleProgress,
} from '../actions';

import { API } from '../config/consts';

import { Epic, Socket } from './';

const socketConnectEpic: Epic = (action$, state$, { io, socket$ }) =>
    action$.pipe(
        ofType(SOCKET_START),
        switchMap(() =>
            new Observable<Socket>((o) => {
                const socket = io(API);
                socket.on('connect', () => o.next(socket));
                socket.on('disconnect', socket.close);
            }),
        ),
        tap(socket$),
        ignoreElements(),
    );

const socketReceiveEpic: Epic = (action$, state$, { socket$ }) =>
    socket$.pipe(
        switchMap((socket) => !socket ? EMPTY :
            new Observable<Action>((o) => {
                socket.on('removeUser', (res: { cid: string, title: string }) => {
                    const { cid, title } = res;
                    if (title === state$.value.star.viewing) {
                        o.next(toggleProgress(true));
                        o.next(removeUserFulfilled(cid));
                        o.next(setShouldUpdateStar());
                        o.next(enqueueSnackbar('有候选人被移除了！', { variant: 'info' }));
                        o.next(toggleProgress());
                    }
                });
                socket.on('removeUserError', (res: { message: string, type: VariantType }) => {
                    const { message, type } = res;
                    o.next(enqueueSnackbar(`ERROR: ${message}`, { variant: type || 'error' }));
                    o.next(toggleProgress());
                });

                // socket.on('moveUser', (res: { cid: string, from: Step, to: Step, title: string }) => {
                //     const { cid, from, to, title } = res;
                //     o.next(toggleProgress(true));
                //     if (title === state$.value.star.viewing) {
                //         o.next(moveUserFulfilled(from, to, cid));
                //         o.next(setShouldUpdateStar());
                //         o.next(enqueueSnackbar('有候选人被移动了！', { variant: 'info' }));
                //         o.next(toggleProgress());
                //     }
                // });
                // socket.on('moveUserSuccess', () => {
                //     o.next(setShouldUpdateStar());
                //     o.next(toggleProgress());
                // });
                // socket.on('moveUserError', (res: { message: string, type: VariantType, data: { to: Step, from: Step, cid: string } }) => {
                //     const { message, type, data } = res;
                //     o.next(moveUserFulfilled(data.to, data.from, data.cid));
                //     o.next(enqueueSnackbar(`ERROR: ${message}`, { variant: type || 'error' }));
                //     o.next(toggleProgress());
                // });

                socket.on('addComment', (res: { cid: string, comment: Comment, title: string }) => {
                    const { cid, comment, title } = res;
                    if (title === state$.value.star.viewing) {
                        o.next(toggleProgress(true));
                        o.next(addCommentFulfilled(cid, comment));
                        o.next(toggleProgress());
                    }
                });
                socket.on('addCommentError', (res: { message: string, type: VariantType }) => {
                    const { message, type } = res;
                    o.next(enqueueSnackbar(`ERROR: ${message}`, { variant: type || 'error' }));
                    o.next(toggleProgress());
                });

                socket.on('removeComment', (res: { cid: string, id: string, title: string }) => {
                    const { cid, id, title } = res;
                    if (title === state$.value.star.viewing) {
                        o.next(toggleProgress(true));
                        o.next(removeCommentFulfilled(cid, id));
                        o.next(toggleProgress());
                    }
                });
                socket.on('removeCommentError', (res: { message: string, type: VariantType }) => {
                    const { message, type } = res;
                    o.next(enqueueSnackbar(`ERROR: ${message}`, { variant: type || 'error' }));
                    o.next(toggleProgress());
                });

                socket.on('updateStar', () => {
                    o.next(toggleProgress(true));
                    o.next(setShouldUpdateStar());
                    o.next(toggleProgress());
                });

            }),
        ),
    );

export default [socketConnectEpic, socketReceiveEpic];
