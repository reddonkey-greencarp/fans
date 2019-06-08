import { Button } from '@material-ui/core';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import { OptionsObject } from 'notistack';
import React, { PureComponent } from 'react';

import Modal from '../components/Modal';
import Offline from '../components/Offline';
import Questions from '../components/Questions';
import Schedule from '../components/Schedule';
import { Offline as IOffline, Question, Schedule as ISchedule, Star as IStar, User } from '../config/types';

import styles from '../styles/data';

interface Props extends WithStyles<typeof styles> {
    users: User[];
    star?: IStar;
    enqueueSnackbar: (info: string, options: OptionsObject) => void;
    setSchedule: (schedule: ISchedule) => void;
    setOffline: (offline: IOffline) => void;
    setQuestions: (questions: Question[]) => void;
}

class Data extends PureComponent<Props> {

    state = {
        interviewType: 'group' as 'group',
        modalType: ''
    };

    toggleModal = (type: string) => () => {
        this.setState({
            modalType: type
        });
    };

    setQuestions = (questions: Question[]) => {
        this.props.setQuestions(questions);
    };

    setSchedule = (schedule: ISchedule) => {
        this.props.setSchedule(schedule);
    };

    setOffline = (offline: IOffline) => {
        this.props.setOffline(offline);
    };

    render() {
        const { classes, enqueueSnackbar } = this.props;
        const { modalType } = this.state;

        const modals = {
            questions: <Questions questions={[]} handleClose={this.toggleModal('')} setQuestions={this.setQuestions} />,
            schedule: <Schedule setSchedule={this.setSchedule} handleClose={this.toggleModal('')} />,
            offline: <Offline setOffline={this.setOffline} enqueueSnackbar={enqueueSnackbar} handleClose={this.toggleModal('')} />,
            fundraising: '集资数据'
        };
        const titles = {
            questions: '粉丝题目内容',
            schedule: '活动日程安排',
            offline: '线下应援情况',
            fundraising: '集资数据'
        };
        return (
            <>
                <div className={classes.container}>
                    <Button color='primary' variant='contained' onClick={this.toggleModal('questions')}>上传粉丝题目内容</Button>
                    <Button color='primary' variant='contained' onClick={this.toggleModal('schedule')}>上传活动日程安排</Button>
                    <Button color='primary' variant='contained' onClick={this.toggleModal('offline')}>上传线下应援情况</Button>
                    <Button color='primary' variant='contained' onClick={this.toggleModal('fundraising')}>上传集资数据</Button>
                </div>
                <Modal open={!!modalType} onClose={this.toggleModal('')} title={titles[modalType]}>{modals[modalType]}</Modal>
            </>
        );
    }
}

export default withStyles(styles)(Data);
