import React, { PureComponent } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { OptionsObject } from 'notistack';

import { User } from '../../config/types';

import styles from '../../styles/column';

import Info from './Info';

interface Props extends WithStyles<typeof styles> {
    index: number;
    user: User;
    downloadingResume: {
        progress: number;
        cid: string;
    };
    handlePrev: (index: number) => void;
    handleNext: (index: number) => void;
    submit: (cid: string, comment: Partial<Comment>) => void;
    remove: (cid: string, id: string) => void;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    getResume: (cid: string) => void;
    handleTodo: () => void;
}

interface State {
    user: User;
}

class Detail extends PureComponent<Props, State> {

    state = {
        user: this.props.user
    };

    componentDidUpdate() {
        this.setState((prevState, { user }) => ({
            user: user || prevState.user
        }));
    }

    handleClick = (type: string) => () => {
        const { handlePrev, handleNext, index } = this.props;
        type === 'prev' ? handlePrev(index) : handleNext(index);
    };

    componentWillUnmount() {
        this.props.handleTodo();
    }

    render() {
        const { classes, getResume, downloadingResume } = this.props;
        const { user } = this.state;
        return (
            <div className={classes.detailContent}>
                <IconButton className={classes.leftButton} onClick={this.handleClick('prev')}>
                    <ExpandMoreIcon />
                </IconButton>
                <div className={classes.detailMain}>
                    <Info info={user} getResume={getResume} downloadingResume={downloadingResume} />
                </div>
                <IconButton className={classes.rightButton} onClick={this.handleClick('next')}>
                    <ExpandMoreIcon />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(Detail);
