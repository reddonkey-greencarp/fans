// import { Button } from '@material-ui/core';
//
// import Divider from '@material-ui/core/Divider';
// import Typography from '@material-ui/core/Typography';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { OptionsObject } from 'notistack';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import { Star } from '../config/types';
import styles from '../styles/dashboard';

interface Props extends WithStyles<typeof styles> {
    data: Star[];
    viewing: string;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    launchStar: (info: Partial<Star>) => void;
    setViewing: (title: string) => void;
}

class Dashboard extends PureComponent<Props> {

    state = {
        shouldClear: false,
        shouldRedirect: false,
    };

    componentDidUpdate({ viewing, data: { length } }: Props) {
        this.setState((prevState, props) => ({
            shouldClear: length !== props.data.length,
            shouldRedirect: viewing !== props.viewing && viewing
        }));
    }

    render() {
        // const { classes, data } = this.props;
        // const { shouldRedirect } = this.state;
        return /*shouldRedirect ? */<Redirect to='/data' />;/* : (
            <div className={classes.root}>
                <div className={classes.left}>
                    <Typography variant='h4' className={classes.title}>Stars</Typography>
                    <Divider variant='middle' />
                    {data.map(({ name }, index) => <Button variant='contained' color='primary' key={index}>{name}</Button>)}
                </div>
            </div>
        );*/
    }
}

export default withStyles(styles)(Dashboard);
