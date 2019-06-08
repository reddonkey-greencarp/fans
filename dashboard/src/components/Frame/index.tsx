import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import Progress from '../Progress';

import AppBar from '../../containers/AppBar';
import Drawer from '../../containers/Drawer';
import styles from '../../styles/main';

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    loggedIn: boolean;
    viewingStar: string;
    loading: boolean;
    getUserInfo: () => void;
    toggleOpen: () => void;
    getStars: () => void;
    getUsers: (title: string) => void;
    getGroupInfo: () => void;
}

class Frame extends PureComponent<Props> {

    componentDidMount() {
        const { loggedIn, getGroupInfo, getStars, getUserInfo, viewingStar, getUsers } = this.props;
        if (loggedIn) {
            getUserInfo();
            getStars();
            getGroupInfo();
            viewingStar && getUsers(viewingStar);
        }
    }

    componentDidUpdate(prevProps: Props) {
        const { getUsers, viewingStar } = this.props;
        if (!prevProps.viewingStar && viewingStar) {
            getUsers(viewingStar);
        }
    }

    handleClick = () => {
        const { open, toggleOpen } = this.props;
        open && toggleOpen();
    };

    render() {
        const { classes, children, loggedIn, loading } = this.props;
        return (
            loggedIn ? <div className={classes.root}>
                <AppBar />
                <Drawer />
                <main className={classes.content} onClick={this.handleClick}>
                    {children}
                </main>
                {loading && <Progress />}
            </div> : <Redirect to='/login' />
        );
    }
}

export default withStyles(styles)(Frame);
