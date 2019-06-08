import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import RefreshIcon from '@material-ui/icons/Refresh';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { RouteComponentProps } from 'react-router';

import { Step } from '../../config/types';
import styles from '../../styles/appBar';

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    viewingStar: string;
    steps: Step[];
    toggleDrawer: () => void;
    logout: () => void;
    setSteps: (stepType: number) => void;
}

class Bar extends PureComponent<Props & RouteComponentProps> {
    state = {
        anchorEl: undefined,
    };

    handleClick = ({ currentTarget }: React.MouseEvent) => {
        this.setState({ anchorEl: currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        this.handleClose();
        this.props.logout();
    };

    refresh = () => {
        window.localStorage.clear();
        window.location.reload();
    };

    render() {
        const { classes, open, toggleDrawer, location: { pathname } } = this.props;
        const { anchorEl } = this.state;
        const pathToTitle = {
            '/': `管理后台`,
            '/data': `活动管理`,
            '/users': `粉丝管理`,
        };
        return (
            <AppBar position='fixed' className={classNames(classes.appBar, open && classes.appBarShift)}>
                <Toolbar disableGutters={!open} classes={{ gutters: classes.appBarGutters, regular: classes.regular }}>
                    <IconButton
                        color='inherit'
                        onClick={toggleDrawer}
                        className={classNames(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant='h6' color='inherit' noWrap>{pathToTitle[pathname]}</Typography>
                    <div className={classNames(open && classes.hide, classes.rightButtons)}>
                        <IconButton color='inherit' onClick={this.refresh}>
                            <RefreshIcon />
                        </IconButton>
                        <IconButton color='inherit' onClick={this.handleClick}>
                            <PersonIcon />
                        </IconButton>
                    </div>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleClose}
                    >
                        <MenuItem onClick={this.handleLogout}>退出</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(Bar);
