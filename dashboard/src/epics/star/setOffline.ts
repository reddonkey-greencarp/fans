import { ofType } from "redux-observable";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { catchError, mergeMap, startWith } from "rxjs/operators";

import {
  enqueueSnackbar,
  getStarsStart,
  SET_OFFLINE,
  SetOffline,
  setShouldUpdateStar,
  toggleProgress
} from "../../actions";

import { API } from "../../config/consts";

import { checkToken, customError, Epic, errHandler } from "../";

export const setOfflineEpic: Epic<SetOffline> = action$ =>
  action$.pipe(
    ofType(SET_OFFLINE),
    mergeMap(({ offline }) => {
      const token = checkToken();
      return ajax
        .post(`${API}/offline/`, JSON.stringify(offline), {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        })
        .pipe(
          mergeMap(({ response: res }) => {
            if (res.type === "success") {
              return of(
                setShouldUpdateStar(),
                enqueueSnackbar("设置线下应援情况成功！", {
                  variant: "success"
                }),
                getStarsStart(),
                toggleProgress()
              );
            }
            throw customError(res);
          }),
          startWith(toggleProgress(true)),
          catchError(err => errHandler(err))
        );
    }),
    catchError(err => errHandler(err))
  );
