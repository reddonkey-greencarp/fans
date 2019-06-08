import React, { PureComponent } from 'react';

import { OptionsObject } from 'notistack';

import { EnqueueSnackbar } from '../actions';
import Board from '../components/Board';
import Dialog from '../components/Dialog';
import Modal from '../components/Modal';
import { STEPS } from '../config/consts';
import { User, Step } from '../config/types';
import Detail from '../containers/Detail';

interface Props {
    users: User[];
    selected: string[];
    fabOn: number;
    steps: Step[];
    snackbars: EnqueueSnackbar['notification'][];
    select: (cid: string[]) => void;
    deselect: (cid: string[] | string) => void;
    toggleFabOff: () => void;
    move: (from: Step, to: Step, cid: string, position: number) => void;
    remove: (cid: string) => void;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

class Users extends PureComponent<Props> {

    state = {
        dialog: false,
        modal: false,
        step: -1,
        index: -1,
        direction: 'left' as 'left',
        todo: () => undefined
    };

    componentDidUpdate(prevProps: Props) {
        const prev = prevProps.users.filter(({ step }) => step === this.state.step);
        const now = this.props.users.filter(({ step }) => step === this.state.step);
        if (prev.length !== now.length) {
            this.setState({
                index: -1
            });
        }
    }

    divideSteps = (users: User[], shouldSpread = false) => {
        let userInSteps = STEPS.map((_, i) => users.filter(({ step }) => step === i));
        if (shouldSpread) {
            userInSteps = userInSteps.map((toSpread) => ({ ...toSpread }));
        }
        return userInSteps;
    };

    handleNext = (index: number) => {
        const { users } = this.props;
        const { step } = this.state;
        this.setState({
            direction: 'left',
            index: -1,
            todo: () => this.setState({
                index: index + 1 === this.divideSteps(users)[step].length ? -1 : index + 1
            }, () => this.setState({
                todo: () => undefined
            }))
        });
    };

    handlePrev = (index: number) => {
        this.setState({
            direction: 'right',
            index: -1,
            todo: () => this.setState({
                index: Math.max(index - 1, -1)
            }, () => this.setState({
                todo: () => undefined
            }))
        });
    };

    handleTodo = () => {
        this.state.todo();
    };

    toggleDetail = (step: number) => (index: number) => () => {
        this.setState({
            step,
            index,
        });
    };

    handleRemove = (selected: string[]) => () => {
        this.toggleOpen('dialog')();
        const { enqueueSnackbar, remove } = this.props;
        if (selected.length === 0) {
            enqueueSnackbar('你没有选中任何人');
            return;
        }
        selected.map((cid) => remove(cid));
    };

    toggleOpen = (name: string) => () => {
        const { deselect, selected } = this.props;
        this.state.modal && deselect(selected);
        this.setState((state) => ({
            [name]: !state[name],
        }));
    };

    render() {
        const { state, props, toggleOpen, handleRemove, handleNext, handlePrev, toggleDetail, handleTodo } = this;
        const { selected, users, move, steps } = props;
        const { dialog, step, index, direction } = state;
        return (
            <>
                <Board
                    move={move}
                    steps={steps}
                    users={users}
                    toggleDetail={toggleDetail}
                />
                {/*<Fab selected={selected} deselect={deselect} fabOn={fabOn} select={select} snackbars={snackbars}*/}
                {/*     users={usersInSteps[fabOn] || []} toggleFabOff={toggleFabOff}*/}
                {/*     toggleOpen={toggleOpen} steps={steps}/>*/}
                <Dialog
                    open={dialog}
                    onClick={handleRemove(selected)}
                    toggleOpen={toggleOpen('dialog')}
                    title='提醒'
                    content='这将永远移除该候选人，你确定吗？'
                    yes='确定移除'
                />
                <Modal open={index >= 0} onClose={toggleDetail(0)(-1)} direction={direction} title='详细信息'>
                    {step >= 0 && <Detail
                        index={index}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                        user={users[index]}
                        handleTodo={handleTodo}
                    />}
                </Modal>
            </>
        );
    }
}

export default Users;
