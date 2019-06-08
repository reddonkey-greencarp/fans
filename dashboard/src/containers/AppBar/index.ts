import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Dispatch } from 'redux';

import {
    Logout,
    logout,
    SetSteps,
    setSteps,
    ToggleDrawer,
    toggleDrawer
} from '../../actions';
import { StoreState } from '../../reducers';

import AppBar from '../../components/AppBar';

const mapStateToProps =
    ({ component: { drawerOpen }, admin: { token }, user: { steps }, star: { viewing } }: StoreState,
     ownProps: RouteComponentProps) => ({
        open: drawerOpen,
        loggedIn: Boolean(token),
        steps,
        viewingStar: viewing,
        ...ownProps,
    });

type DispatchType = Dispatch<ToggleDrawer | Logout | SetSteps>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    toggleDrawer: () => dispatch(toggleDrawer()),
    logout: () => dispatch(logout()),
    setSteps: (stepType: number) => dispatch(setSteps(stepType)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppBar));
