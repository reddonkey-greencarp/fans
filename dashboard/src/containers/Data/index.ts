import { OptionsObject } from 'notistack';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { enqueueSnackbar, EnqueueSnackbar, setSchedule, SetSchedule, setOffline, SetOffline, setQuestions, SetQuestions } from '../../actions';
import { Offline, Question, Schedule } from '../../config/types';
import { StoreState } from '../../reducers';

import Data from '../../views/Data';

const mapStateToProps =
    ({ star: { stars, viewing }, user: { users } }: StoreState) => ({
        star: stars.find((star) => star.name === viewing),
        users
    });

type DispatchType = Dispatch<EnqueueSnackbar | SetOffline | SetSchedule | SetQuestions>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    enqueueSnackbar: (message: string, options: OptionsObject = { variant: 'warning' }) => dispatch(enqueueSnackbar(message, options)),
    setSchedule: (schedule: Schedule) => dispatch(setSchedule(schedule)),
    setOffline: (offline: Offline) => dispatch(setOffline(offline)),
    setQuestions: (questions: Question[]) => dispatch(setQuestions(questions))
});

export default connect(mapStateToProps, mapDispatchToProps)(Data);
