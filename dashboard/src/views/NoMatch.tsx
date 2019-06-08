import React, { PureComponent } from 'react';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import styles from '../styles/noMatch';

class NoMatch extends PureComponent<WithStyles<typeof styles>> {
    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.container}>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(NoMatch);
