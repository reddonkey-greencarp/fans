import React, { PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import AddIcon from '@material-ui/icons/Add';

import Modal from '../Modal';

import { Star } from '../../config/types';
import Verify from '../../containers/Verify';
import styles from '../../styles/addOne';
import { getMidnight } from '../../utils/getMidnight';

interface Props extends WithStyles<typeof styles> {
    enqueueSnackbar: (info: string) => void;
    launchStar: (info: Partial<Star & { code: string }>) => void;
    shouldClear: boolean;
}

const generateTitle = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const type = month <= 5 ? 'S' : month >= 9 ? 'A' : 'C';
    return year + type;
};

const initialState = () => {
    const date = new Date();
    return {
        modalOpen: false,
        name: generateTitle(date),
        begin: date,
        end: date,
        stop: date,
        code: '',
        launched: false,
    };
};

class AddOne extends PureComponent<Props> {

    state = initialState();

    componentDidUpdate() {
        if (this.props.shouldClear) {
            this.setState(initialState());
        }
    }

    launchStar = () => {
        const { code, begin, end, stop, name } = this.state;
        const { enqueueSnackbar, launchStar } = this.props;
        if (!code || !begin || !end || !stop || !name) {
            enqueueSnackbar('请完整填写信息！');
            return;
        }
        if (begin >= stop) {
            enqueueSnackbar('截止时间必须大于开始时间！');
            return;
        }
        if (stop >= end) {
            enqueueSnackbar('结束时间必须大于截止时间！');
            return;
        }
        launchStar({
            name,
            begin: getMidnight(begin),
            end: getMidnight(end),
            stop: getMidnight(stop),
            code,
        });
        this.setState({
            launched: true,
        });
    };

    handleChange = (name: string) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [name]: value,
        });
    };

    handleChangeDate = (name: string) => (date: Date | null) => {
        if (date) {
            this.setState({
                [name]: date
            });
            if (name === 'begin') {
                this.setState({
                    title: generateTitle(date)
                });
            }
        }
    };

    toggleModalOpen = () => {
        this.setState(({ modalOpen }: { modalOpen: boolean }) => ({ modalOpen: !modalOpen }));
    };

    render() {
        const { classes } = this.props;
        const { code, modalOpen, name } = this.state;
        return (
            <>
                <Tooltip title='发起明星' classes={{ tooltip: classes.tooltip }} placement='top'>
                    <Paper className={classes.paper}>
                        <IconButton
                            className={classes.newButton}
                            classes={{ root: classes.newButtonRoot }}
                            onClick={this.toggleModalOpen}
                        >
                            <AddIcon color='primary' className={classes.newIcon} />
                        </IconButton>
                    </Paper>
                </Tooltip>
                <Modal
                    title='发起明星'
                    open={modalOpen}
                    onClose={this.toggleModalOpen}
                >
                    <div className={classes.newContainer}>
                        <TextField
                            label='明星名称'
                            className={classes.textField}
                            value={name}
                            margin='normal'
                            disabled
                        />
                        <Verify onChange={this.handleChange('code')} code={code} />
                        <Button color='primary' variant='contained' onClick={this.launchStar}>确定</Button>
                    </div>
                </Modal>
            </>
        );
    }
}

export default withStyles(styles)(AddOne);
