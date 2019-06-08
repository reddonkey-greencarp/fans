import React, { PureComponent } from 'react';

import classNames from 'classnames';

import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import PieChartIcon from '@material-ui/icons/PieChart';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import styles from '../../styles/drawer';

import Anchor from '../Anchor';

interface Props extends WithStyles<typeof styles> {
    open: boolean;
    toggleOpen: () => void;
}

class Menu extends PureComponent<Props> {

    render() {
        const { classes, open, toggleOpen } = this.props;
        const listItems = [
            { to: '/', text: '管理后台', icon: <HomeIcon /> },
            { to: '/data', text: '活动管理', icon: <PieChartIcon /> },
            { to: '/users', text: '粉丝管理', icon: <DashboardIcon /> },
        ];
        return (
            <Drawer
                variant='permanent'
                classes={{ paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose) }}
                open={open}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={toggleOpen}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {listItems.map(({ to, text, icon }, index) =>
                        <Anchor to={to} key={index}>
                            <ListItem button onClick={open ? toggleOpen : undefined}>
                                <ListItemIcon className={classes.icon}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        </Anchor>
                    )}
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles)(Menu);
