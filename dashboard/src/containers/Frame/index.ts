import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    getUsersStart,
    GetUsersStart,
    getGroupInfoStart,
    GetGroupInfoStart,
    getStarsStart,
    GetStarsStart,
    getUserInfoStart,
    GetUserInfoStart,
    toggleDrawer,
    ToggleDrawer
} from '../../actions';
import { StoreState } from '../../reducers';

import Frame from '../../components/Frame';

const mapStateToProps = ({ admin: { token }, star: { viewing }, component: { drawerOpen, progressOn } }: StoreState) => ({
    open: drawerOpen,
    loggedIn: Boolean(token),
    loading: progressOn,
    viewingStar: viewing
});

type DispatchType = Dispatch<| GetUserInfoStart
    | ToggleDrawer
    | GetGroupInfoStart
    | GetStarsStart
    | GetUsersStart>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    toggleOpen: () => dispatch(toggleDrawer()),
    getUserInfo: () => dispatch(getUserInfoStart()),
    getStars: () => dispatch(getStarsStart()),
    getUsers: (title: string) => dispatch(getUsersStart(title)),
    getGroupInfo: () => dispatch(getGroupInfoStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Frame);
