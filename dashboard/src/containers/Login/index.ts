import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { loginStart } from '../../actions';
import { StoreState } from '../../reducers';

import LoginComponent from '../../components/Login';

const mapStateToProps = ({ admin: { token, key: weChatKey, isScanning }, component: { progressOn } }: StoreState) => ({
    loggedIn: Boolean(token),
    weChatKey,
    isScanning,
    isLoading: progressOn
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (phone: string, password: string) => dispatch(loginStart(phone, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
