import { OptionsObject } from 'notistack';
import { User, Star, Step, Question, Schedule, Offline } from '../config/types';

export const SOCKET_START = 'SOCKET_START';
export type SOCKET_START = typeof SOCKET_START;

export const TOGGLE_PROGRESS = 'TOGGLE_PROGRESS';
export type TOGGLE_PROGRESS = typeof TOGGLE_PROGRESS;

export interface ToggleProgress {
    type: TOGGLE_PROGRESS;
    on: boolean;
}

export function toggleProgress(on = false): ToggleProgress {
    return {
        type: TOGGLE_PROGRESS,
        on
    };
}

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';
export type TOGGLE_DRAWER = typeof TOGGLE_DRAWER;

export interface ToggleDrawer {
    type: TOGGLE_DRAWER;
}

export function toggleDrawer(): ToggleDrawer {
    return {
        type: TOGGLE_DRAWER,
    };
}

export const ENQUEUE_SNACKBAR = 'ENQUEUE_SNACKBAR';
export type ENQUEUE_SNACKBAR = typeof ENQUEUE_SNACKBAR;

export interface EnqueueSnackbar {
    type: ENQUEUE_SNACKBAR;
    notification: {
        key: number;
        message: string;
        options?: OptionsObject;
    };
}

export function enqueueSnackbar(message: string, options?: OptionsObject): EnqueueSnackbar {
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            key: new Date().getTime() + Math.random(),
            message,
            options
        }
    };
}

export const REMOVE_SNACKBAR = 'REMOVE_SNACKBAR';
export type REMOVE_SNACKBAR = typeof REMOVE_SNACKBAR;

export interface RemoveSnackbar {
    type: REMOVE_SNACKBAR;
    key: number;
}

export function removeSnackbar(key: number): RemoveSnackbar {
    return {
        type: REMOVE_SNACKBAR,
        key
    };
}

export const TOGGLE_FAB_ON = 'TOGGLE_FAB_ON';
export type TOGGLE_FAB_ON = typeof TOGGLE_FAB_ON;

export interface ToggleFabOn {
    type: TOGGLE_FAB_ON;
    step: number;
}

export function toggleFabOn(step: number): ToggleFabOn {
    return {
        type: TOGGLE_FAB_ON,
        step,
    };
}

export const TOGGLE_FAB_OFF = 'TOGGLE_FAB_OFF';
export type TOGGLE_FAB_OFF = typeof TOGGLE_FAB_OFF;

export interface ToggleFabOff {
    type: TOGGLE_FAB_OFF;
}

export function toggleFabOff(): ToggleFabOff {
    return {
        type: TOGGLE_FAB_OFF,
    };
}

export const ADD_COMMENT_START = 'ADD_COMMENT_START';
export type ADD_COMMENT_START = typeof ADD_COMMENT_START;

export interface AddCommentStart {
    type: ADD_COMMENT_START;
    cid: string;
    comment: Partial<Comment>;
}

export function addCommentStart(cid: string, comment: Partial<Comment>): AddCommentStart {
    return {
        type: ADD_COMMENT_START,
        cid,
        comment,
    };
}

export const ADD_COMMENT_FULFILLED = 'ADD_COMMENT_FULFILLED';
export type ADD_COMMENT_FULFILLED = typeof ADD_COMMENT_FULFILLED;

export interface AddCommentFulfilled {
    type: ADD_COMMENT_FULFILLED;
    cid: string;
    comment: Comment;
}

export function addCommentFulfilled(cid: string, comment: Comment): AddCommentFulfilled {
    return {
        type: ADD_COMMENT_FULFILLED,
        cid,
        comment,
    };
}

export const REMOVE_COMMENT_START = 'REMOVE_COMMENT_START';
export type REMOVE_COMMENT_START = typeof REMOVE_COMMENT_START;

export interface RemoveCommentStart {
    type: REMOVE_COMMENT_START;
    cid: string;
    id: string;
}

export function removeCommentStart(cid: string, id: string): RemoveCommentStart {
    return {
        type: REMOVE_COMMENT_START,
        cid,
        id,
    };
}

export const REMOVE_COMMENT_FULFILLED = 'REMOVE_COMMENT_FULFILLED';
export type REMOVE_COMMENT_FULFILLED = typeof REMOVE_COMMENT_FULFILLED;

export interface RemoveCommentFulfilled {
    type: REMOVE_COMMENT_FULFILLED;
    cid: string;
    id: string;
}

export function removeCommentFulfilled(cid: string, id: string): RemoveCommentFulfilled {
    return {
        type: REMOVE_COMMENT_FULFILLED,
        cid,
        id,
    };
}

export const GET_USERS_START = 'GET_USERS_START';
export type GET_USERS_START = typeof GET_USERS_START;

export interface GetUsersStart {
    type: GET_USERS_START;
    title: string;
    step?: number;
}

export function getUsersStart(title: string, step?: number): GetUsersStart {
    return {
        type: GET_USERS_START,
        title,
        step
    };
}

export const GET_USERS_FULFILLED = 'GET_USERS_FULFILLED';
export type GET_USERS_FULFILLED = typeof GET_USERS_FULFILLED;

export interface GetUsersFulfilled {
    type: GET_USERS_FULFILLED;
    users: User[];
}

export function getUsersFulfilled(users: User[]): GetUsersFulfilled {
    return {
        type: GET_USERS_FULFILLED,
        users,
    };
}

export const GET_RESUME = 'GET_RESUME';
export type GET_RESUME = typeof GET_RESUME;

export interface GetResume {
    type: GET_RESUME;
    cid: string;
}

export function getResume(cid: string): GetResume {
    return {
        type: GET_RESUME,
        cid,
    };
}

export const SELECT_USER = 'SELECT_USER';
export type SELECT_USER = typeof SELECT_USER;

export interface SelectUser {
    type: SELECT_USER;
    cid: string | string[];
}

export function selectUser(cid: string | string[]): SelectUser {
    return {
        type: SELECT_USER,
        cid,
    };
}

export const DESELECT_USER = 'DESELECT_USER';
export type DESELECT_USER = typeof DESELECT_USER;

export interface DeselectUser {
    type: DESELECT_USER;
    cid: string | string[];
}

export function deselectUser(cid: string | string[]): DeselectUser {
    return {
        type: DESELECT_USER,
        cid,
    };
}

export const REMOVE_USER_START = 'REMOVE_USER_START';
export type REMOVE_USER_START = typeof REMOVE_USER_START;

export interface RemoveUserStart {
    type: REMOVE_USER_START;
    cid: string | string[];
}

export function removeUserStart(cid: string | string[]): RemoveUserStart {
    return {
        type: REMOVE_USER_START,
        cid,
    };
}

export const REMOVE_USER_FULFILLED = 'REMOVE_USER_FULFILLED';
export type REMOVE_USER_FULFILLED = typeof REMOVE_USER_FULFILLED;

export interface RemoveUserFulfilled {
    type: REMOVE_USER_FULFILLED;
    cid: string | string[];
}

export function removeUserFulfilled(cid: string | string[]): RemoveUserFulfilled {
    return {
        type: REMOVE_USER_FULFILLED,
        cid,
    };
}

export const MOVE_USER_START = 'MOVE_USER_START';
export type MOVE_USER_START = typeof MOVE_USER_START;

export interface MoveUserStart {
    type: MOVE_USER_START;
    from: Step;
    to: Step;
    cid: string;
    position?: number;
}

export function moveUserStart(from: Step, to: Step, cid: string, position?: number): MoveUserStart {
    return {
        type: MOVE_USER_START,
        from,
        to,
        cid,
        position,
    };
}

export const MOVE_USER_FULFILLED = 'MOVE_USER_FULFILLED';
export type MOVE_USER_FULFILLED = typeof MOVE_USER_FULFILLED;

export interface MoveUserFulfilled {
    type: MOVE_USER_FULFILLED;
    from: Step;
    to: Step;
    cid: string;
    position?: number;
}

export function moveUserFulfilled(from: Step, to: Step, cid: string, position?: number): MoveUserFulfilled {
    return {
        type: MOVE_USER_FULFILLED,
        from,
        to,
        cid,
        position,
    };
}

export const ALLOCATE_ONE_FULFILLED = 'ALLOCATE_ONE_FULFILLED';
export type ALLOCATE_ONE_FULFILLED = typeof ALLOCATE_ONE_FULFILLED;

export interface AllocateOneFulfilled {
    type: ALLOCATE_ONE_FULFILLED;
    cid: string;
    time: number;
    interviewType: 'group' | 'team';
}

export function allocateOneFulfilled(cid: string, time: number, interviewType: 'group' | 'team'): AllocateOneFulfilled {
    return {
        type: ALLOCATE_ONE_FULFILLED,
        cid,
        time,
        interviewType
    };
}

export const ALLOCATE_ALL_FULFILLED = 'ALLOCATE_ALL_FULFILLED';
export type ALLOCATE_ALL_FULFILLED = typeof ALLOCATE_ALL_FULFILLED;

export interface AllocateAllFulfilled {
    type: ALLOCATE_ALL_FULFILLED;
    data: {
        id: string;
        time: number;
    }[];
    interviewType: 'group' | 'team';
}

export function allocateAllFulfilled(data: AllocateAllFulfilled['data'], interviewType: 'group' | 'team'): AllocateAllFulfilled {
    return {
        type: ALLOCATE_ALL_FULFILLED,
        data,
        interviewType
    };
}

export const SET_STEPS = 'SET_STEPS';
export type SET_STEPS = typeof SET_STEPS;

export interface SetSteps {
    type: SET_STEPS;
    stepType: number;
}

export function setSteps(stepType: number): SetSteps {
    return {
        type: SET_STEPS,
        stepType,
    };
}

export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export interface Login {
    type: LOGIN;
    token: string;
}

export function login(token: string): Login {
    return {
        type: LOGIN,
        token
    };
}

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

export interface Logout {
    type: LOGOUT;
}

export function logout(): Logout {
    return {
        type: LOGOUT,
    };
}

export const LOGIN_START = 'LOGIN_START';
export type LOGIN_START = typeof LOGIN_START;
export interface LoginStart {
    type: LOGIN_START;
    phone: string;
    password: string;
}

export function loginStart(phone: string, password: string): LoginStart {
    return {
        type: LOGIN_START,
        password,
        phone
    };
}

export const GET_USER_INFO_START = 'GET_USER_INFO_START';
export type GET_USER_INFO_START = typeof GET_USER_INFO_START;

export interface GetUserInfoStart {
    type: GET_USER_INFO_START;
}

export function getUserInfoStart(): GetUserInfoStart {
    return {
        type: GET_USER_INFO_START,
    };
}

export const GET_GROUP_INFO_START = 'GET_GROUP_INFO_START';
export type GET_GROUP_INFO_START = typeof GET_GROUP_INFO_START;

export interface GetGroupInfoStart {
    type: GET_GROUP_INFO_START;
}

export function getGroupInfoStart(): GetGroupInfoStart {
    return {
        type: GET_GROUP_INFO_START,
    };
}

export const GET_STARS_START = 'GET_STARS_START';
export type GET_STARS_START = typeof GET_STARS_START;

export interface GetStarsStart {
    type: GET_STARS_START;
}

export function getStarsStart(): GetStarsStart {
    return {
        type: GET_STARS_START,
    };
}

export const GET_STARS_FULFILLED = 'GET_STARS_FULFILLED';
export type GET_STARS_FULFILLED = typeof GET_STARS_FULFILLED;

export interface GetStarsFulfilled {
    type: GET_STARS_FULFILLED;
    stars: Star[];
}

export function getStarsFulfilled(stars: Star[]): GetStarsFulfilled {
    return {
        type: GET_STARS_FULFILLED,
        stars,
    };
}

export const LAUNCH_STAR = 'LAUNCH_STAR';
export type LAUNCH_STAR = typeof LAUNCH_STAR;

export interface LaunchStar {
    type: LAUNCH_STAR;
    info: Partial<Star>;
}

export function launchStar(info: Partial<Star>): LaunchStar {
    return {
        type: LAUNCH_STAR,
        info,
    };
}

export const SET_VIEWING_STAR_START = 'SET_VIEWING_STAR_START';
export type SET_VIEWING_STAR_START = typeof SET_VIEWING_STAR_START;

export interface SetViewingStarStart {
    type: SET_VIEWING_STAR_START;
    title: string;
}

export function setViewingStarStart(title: string): SetViewingStarStart {
    return {
        type: SET_VIEWING_STAR_START,
        title
    };
}

export const SET_VIEWING_STAR_FULFILLED = 'SET_VIEWING_STAR_FULFILLED';
export type SET_VIEWING_STAR_FULFILLED = typeof SET_VIEWING_STAR_FULFILLED;

export interface SetViewingStarFulfilled {
    type: SET_VIEWING_STAR_FULFILLED;
    title: string;
}

export function setViewingStarFulfilled(title: string): SetViewingStarFulfilled {
    return {
        type: SET_VIEWING_STAR_FULFILLED,
        title
    };
}

export const SET_SHOULD_UPDATE_STAR = 'SET_SHOULD_UPDATE_STAR';
export type SET_SHOULD_UPDATE_STAR = typeof SET_SHOULD_UPDATE_STAR;

export interface SetShouldUpdateStar {
    type: SET_SHOULD_UPDATE_STAR;
}

export function setShouldUpdateStar(): SetShouldUpdateStar {
    return {
        type: SET_SHOULD_UPDATE_STAR,
    };
}

export const GET_VERIFY_CODE = 'GET_VERIFY_CODE';
export type GET_VERIFY_CODE = typeof GET_VERIFY_CODE;

export interface GetVerifyCode {
    type: GET_VERIFY_CODE;
}

export function getVerifyCode(): GetVerifyCode {
    return {
        type: GET_VERIFY_CODE,
    };
}

export const RESUME_PROGRESS = 'RESUME_PROGRESS';
export type RESUME_PROGRESS = typeof RESUME_PROGRESS;

export interface ResumeProgress {
    type: RESUME_PROGRESS;
    progress: number;
    cid: string;
}

export function resumeProgress(progress: number, cid: string): ResumeProgress {
    return {
        type: RESUME_PROGRESS,
        progress,
        cid
    };
}

export const SET_QUESTIONS = 'SET_QUESTIONS';
export type SET_QUESTIONS = typeof SET_QUESTIONS;

export interface SetQuestions {
    type: SET_QUESTIONS;
    questions: Question[];
}

export function setQuestions(questions: Question[]): SetQuestions {
    return {
        type: SET_QUESTIONS,
        questions
    }
}

export const SET_SCHEDULE = 'SET_SCHEDULE';
export type SET_SCHEDULE = typeof SET_SCHEDULE;

export interface SetSchedule {
    type: SET_SCHEDULE;
    schedule: Schedule;
}

export function setSchedule(schedule: Schedule): SetSchedule {
    return {
        type: SET_SCHEDULE,
        schedule
    }
}

export const SET_OFFLINE = 'SET_OFFLINE';
export type SET_OFFLINE = typeof SET_OFFLINE;

export interface SetOffline {
    type: SET_OFFLINE;
    offline: Offline;
}

export function setOffline(offline: Offline): SetOffline {
    return {
        type: SET_OFFLINE,
        offline
    }
}
