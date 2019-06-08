import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { OptionsObject } from 'notistack';

import {
    deselectUser,
    DeselectUser,
    enqueueSnackbar,
    EnqueueSnackbar,
    moveUserStart,
    MoveUserStart,
    removeUserStart,
    RemoveUserStart,
    selectUser,
    SelectUser,
    toggleFabOff,
    ToggleFabOff,
} from '../../actions';
import { StoreState } from '../../reducers';

import { Step } from '../../config/types';
import Users from '../../views/Users';

const mapStateToProps =
    ({ user: { selected, users, steps }, component: { fabOn, snackbars } }: StoreState) => ({
        selected,
        fabOn,
        steps,
        users,
        snackbars
    });

type DispatchType =
    Dispatch<MoveUserStart
        | DeselectUser
        | SelectUser
        | ToggleFabOff
        | EnqueueSnackbar
        | RemoveUserStart>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    move: (from: Step, to: Step, cid: string, position: number) => dispatch(moveUserStart(from, to, cid, position)),
    deselect: (name: string[] | string) => dispatch(deselectUser(name)),
    select: (name: string[]) => dispatch(selectUser(name)),
    toggleFabOff: () => dispatch(toggleFabOff()),
    enqueueSnackbar: (message: string, options: OptionsObject = { variant: 'info' }) => dispatch(enqueueSnackbar(message, options)),
    remove: (cid: string) => dispatch(removeUserStart(cid)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
