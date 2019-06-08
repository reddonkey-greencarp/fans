import React, { PureComponent } from 'react';

import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import AddIcon from '@material-ui/icons/Add';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import { EnqueueSnackbar } from '../../actions';
import { User, Step } from '../../config/types';
import styles from '../../styles/column';

interface Props extends WithStyles<typeof styles> {
    users: User[];
    selected: string[];
    fabOn: number;
    steps: Step[];
    snackbars: EnqueueSnackbar['notification'][];
    select: (cid: string[]) => void;
    deselect: (cid: string[] | string) => void;
    toggleFabOff: () => void;
    toggleOpen: (component: string) => () => void;
}

class FabButton extends PureComponent<Props> {

    state = {
        buttons: false,
    };

    componentDidUpdate(prevProps: Props) {
        const { selected, toggleFabOff, steps } = this.props;
        if (prevProps.selected.length !== 0 && selected.length === 0) {
            toggleFabOff();
            this.setState({
                buttons: false
            });
        }
        if (prevProps.steps.length !== steps.length) {
            this.hideFab();
        }
    }

    handleSelectAll = (all: string[]) => () => {
        const { select, users } = this.props;
        select(all.filter((cid) => this.selectable(users, cid)));
    };

    handleInverse = (all: string[], selected: string[]) => () => {
        const { select, deselect, users } = this.props;
        deselect(selected.filter((cid) => this.selectable(users, cid)));
        select(all.filter((cid) => !selected.includes(cid) && this.selectable(users, cid)));
    };

    selectable = (users: User[], cid: string) => {
        const user = users.find(({ _id }) => _id === cid);
        return !!user;
    };

    hideFab = () => {
        const { deselect, selected } = this.props;
        deselect(selected);
    };

    sendNotification = () => {
        this.props.toggleOpen('modal')();
        this.toggleButtons();
    };

    confirmRemove = () => {
        this.props.toggleOpen('dialog')();
        this.toggleButtons();
    };

    toggleButtons = () => {
        this.setState(({ buttons }: { buttons: boolean }) => ({
            buttons: !buttons,
        }));
    };

    render() {
        const { classes, users, selected, fabOn, snackbars } = this.props;
        const all = users.map(({ _id }) => _id);
        const selectedInColumn = selected.filter((cid) => all.includes(cid));
        const ButtonGenerator = (onClick: () => void, content: string, disabled = false) =>
            <Button
                color='primary'
                size='small'
                variant='contained'
                className={classes.fabButton}
                onClick={onClick}
                disabled={disabled}
            >{content}</Button>;
        return (
            <>
                <Zoom in={fabOn !== -1}>
                    <div className={classes.fab}>
                        <Fab
                            className={snackbars.length ? classes.fabMoveUp : classes.fabMoveDown} // TODO: fab move up when snackbar on
                            color='primary'
                            onClick={this.toggleButtons}
                        >
                            <AddIcon />
                        </Fab>
                    </div>
                </Zoom>
                <Zoom in={this.state.buttons}>
                    <div className={classes.fabButtonsZoom}>
                        <div
                            className={classNames(classes.fabButtonsContainer, snackbars.length ? classes.fabMoveUp : classes.fabMoveDown)}
                        >
                            {ButtonGenerator(this.handleSelectAll(all), '全选')}
                            {ButtonGenerator(this.handleInverse(all, selectedInColumn), '反选')}
                            {ButtonGenerator(this.sendNotification, '发送通知', !selectedInColumn.length)}
                            {ButtonGenerator(this.confirmRemove, '移除', !selectedInColumn.length)}
                            {ButtonGenerator(this.hideFab, '隐藏Fab')}
                        </div>
                    </div>
                </Zoom>
            </>
        );
    }
}

export default withStyles(styles)(FabButton);
