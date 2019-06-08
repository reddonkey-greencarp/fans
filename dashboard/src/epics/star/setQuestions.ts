import { ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, mergeMap, startWith } from 'rxjs/operators';

import { enqueueSnackbar, getStarsStart, SET_QUESTIONS, SetQuestions, setShouldUpdateStar, toggleProgress } from '../../actions';

import { API } from '../../config/consts';

import { checkToken, customError, Epic, errHandler } from '../';

export const setQuestionsEpic: Epic<SetQuestions> = (action$) =>
    action$.pipe(
        ofType(SET_QUESTIONS),
        mergeMap(({ questions }) => {
            const token = checkToken();
            return ajax.put(`${API}/star/`, JSON.stringify(questions), {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }).pipe(
                mergeMap(({ response: res }) => {
                    if (res.type === 'success') {
                        return of(
                            setShouldUpdateStar(),
                            enqueueSnackbar('设置粉丝题目内容成功！', { variant: 'success' }),
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
