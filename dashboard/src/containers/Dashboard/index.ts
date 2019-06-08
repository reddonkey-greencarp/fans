import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { OptionsObject } from 'notistack';

import {
    enqueueSnackbar,
    EnqueueSnackbar,
    launchStar,
    LaunchStar,
    setViewingStarStart,
    SetViewingStarStart
} from '../../actions';
import { Star } from '../../config/types';

import { StoreState } from '../../reducers';

import Dashboard from '../../views/Dashboard';

const mapStateToProps = ({ star: { stars: data, viewing } }: StoreState) => ({
    data,
    viewing
});

type DispatchType = Dispatch<SetViewingStarStart | EnqueueSnackbar | LaunchStar>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    setViewing: (title: string) => dispatch(setViewingStarStart(title)),
    enqueueSnackbar: (message: string, options: OptionsObject = { variant: 'warning' }) => dispatch(enqueueSnackbar(message, options)),
    launchStar: (info: Partial<Star>) => dispatch(launchStar(info)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
