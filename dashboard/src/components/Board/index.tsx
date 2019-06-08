import { Button } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';

import Modal from '../Modal';
import { Step, User } from '../../config/types';

import styles from '../../styles/column';

interface Props extends WithStyles<typeof styles> {
    steps: Step[];
    users: User[];
    toggleDetail: (detail: number) => (index: number) => () => void;
    move: (from: Step, to: Step, cid: string, position: number) => void;
}

interface State {
    steps: Step[];
    checked: number[];
    modalIndex: number;
}

class Board extends PureComponent<Props, State> {

    state = {
        steps: this.props.steps,
        checked: this.props.users.map(() => 0),
        modalIndex: -1
    };

    handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = [...this.state.checked];
        const index = +event.target.value;
        checked[index] = checked[index] ? 0 : 1;
        this.setState({
            checked
        })
    };

    handleSubmit = () => {
        const { checked } = this.state;
        const { users } = this.props;
        const passed = users.filter((user, index) => checked[index]).map(i => i._id);
        console.log(passed);
    };

    toggleModal = (index: number) => () => {
        this.setState({
            modalIndex: index
        })
    };

    render() {
        const { users, classes } = this.props;
        const { checked, modalIndex } = this.state;
        return (
            <Paper className={classes.paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>用户名</TableCell>
                            <TableCell>答案</TableCell>
                            <TableCell>通过情况</TableCell>
                            <TableCell>批准通过</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(({ name, _id, step, answer }, index) => (
                            <TableRow key={_id}>
                                <TableCell component="th" scope="row">{name}</TableCell>
                                <TableCell>
                                    <Button variant='contained' color='primary' onClick={this.toggleModal(index)}>显示答案</Button>
                                </TableCell>
                                <TableCell>
                                    {step ? '已通过' : '未通过'}
                                </TableCell>
                                <TableCell>
                                    <Checkbox
                                        disabled={!!step}
                                        color='primary'
                                        value={index}
                                        checked={!!checked[index]}
                                        onChange={this.handleCheck}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button variant='contained' color='primary' onClick={this.handleSubmit} className={classes.button}>提交</Button>
                <Modal
                    open={modalIndex >= 0}
                    title='选手答案'
                    onClose={this.toggleModal(-1)}
                >{
                    modalIndex >= 0 && users[modalIndex].answer
                }</Modal>
            </Paper>
        );
    }
}

export default withStyles(styles)(Board);
