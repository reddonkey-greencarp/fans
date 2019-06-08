import { getStarsEpic } from './getStars';
import { launchStarsEpic } from './launchStar';
import { setOfflineEpic } from './setOffline';
import { setQuestionsEpic } from './setQuestions';
import { setScheduleEpic } from './setSchedule';
import { setViewingEpic } from './setViewing';

export default [getStarsEpic, launchStarsEpic, setOfflineEpic, setQuestionsEpic, setScheduleEpic, setViewingEpic];
