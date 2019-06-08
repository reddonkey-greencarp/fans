import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles, WithStyles } from '@material-ui/styles';
import React, { PureComponent } from 'react';
import { Schedule as ISchedule } from '../../config/types';
import styles from '../../styles/schedule';
import DatePicker from '../DatePicker';

interface Props extends WithStyles<typeof styles> {
    schedule?: ISchedule;
    setSchedule: (schedule: ISchedule) => void;
    handleClose: () => void;
}

class Schedule extends PureComponent<Props> {

    state = this.props.schedule ? { ...this.props.schedule } : {
        notification: '',
        event: {
            start: +new Date(),
            end: +new Date(),
        },
        concert: {
            start: +new Date(),
            end: +new Date(),
        },
        fundraising: {
            start: +new Date(),
            end: +new Date(),
        },
        purchasing: {
            start: +new Date(),
            end: +new Date(),
        }
    };

    setNotification = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            notification: event.target.value
        });
    };

    setTime = (name: string) => (time: Date | null) => {
        const [type, startEnd] = name.split('-');
        this.setState({
            [type]: { ...this.state[type], [startEnd]: +(time || 0) }
        });
    };

    setSchedule = () => {
        this.props.setSchedule(this.state);
    };

    render() {
        const { classes, handleClose } = this.props;
        const schedule = this.state;
        const { notification, concert, event, fundraising, purchasing } = schedule;
        const pickers = [
            { label: '活动', name: 'event', value: event },
            { label: '演唱会', name: 'concert', value: concert },
            { label: '集资', name: 'fundraising', value: fundraising },
            { label: '采购', name: 'purchasing', value: purchasing },
        ];
        return (
            <>
                <TextField
                    label='公告'
                    value={notification}
                    onChange={this.setNotification}
                    className={classes.textField}
                />
                {pickers.map(({ label, name, value }, index) =>
                    <div key={index}>
                        <DatePicker
                            label={label + '开始'}
                            value={new Date(value.start)}
                            onChange={this.setTime(name + '-start')}
                            classes={classes}
                        />
                        <DatePicker
                            label={label + '结束'}
                            value={new Date(value.end)}
                            onChange={this.setTime(name + '-end')}
                            classes={classes}
                        />
                    </div>
                )}
                <div className={classes.div}>
                    <Button color='primary' variant='contained' onClick={this.setSchedule} className={classes.button}>提交</Button>
                    <Button color='primary' variant='contained' onClick={handleClose} className={classes.button}>取消</Button>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(Schedule);
