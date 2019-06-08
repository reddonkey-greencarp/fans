import TextField from '@material-ui/core/TextField';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';
import { User } from '../../config/types';
import styles from '../../styles/user';

interface Props extends WithStyles<typeof styles> {
    info: User;
    getResume: (cid: string) => void;
    downloadingResume: {
        progress: number;
        cid: string;
    };
}

class Info extends PureComponent<Props> {
    state = {
        modalOpen: false,
    };

    render() {
        const { classes, info } = this.props;
        const { name, answer } = info;
        const inputProps = { readOnly: true };
        return (
            <div className={classes.detail}>
                <div className={classes.detailRow}>
                    <TextField
                        label='姓名'
                        value={name}
                        margin='normal'
                        InputProps={{ inputProps }}
                    />
                </div>
                <div className={classes.detailRow}>
                    <TextField
                        label='答案'
                        value={answer}
                        margin='normal'
                        InputProps={{ inputProps }}
                    />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Info);
