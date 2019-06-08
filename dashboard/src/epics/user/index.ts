import { addCommentEpic } from './addComment';
import { getUsersEpic } from './getUsers';
import { getResumeEpic } from './getResume';
import { moveUserEpic } from './moveUser';
import { removeUserEpic } from './removeUser';
import { removeCommentEpic } from './removeComment';

export default [
    getUsersEpic,
    getResumeEpic,
    removeUserEpic,
    moveUserEpic,
    addCommentEpic,
    removeCommentEpic,
];
