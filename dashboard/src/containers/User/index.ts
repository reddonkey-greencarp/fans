import { DraggableProvided } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    deselectUser,
    DeselectUser,
    selectUser,
    SelectUser,
    toggleFabOn,
    ToggleFabOn,
} from '../../actions';
import { StoreState } from '../../reducers';

import User from '../../components/User';

import { User as UserType } from '../../config/types';

interface OwnProps {
    user: UserType;
    provided: DraggableProvided;
    selected: string[];
    toggleDetail: () => void;
}

const mapStateToProps = ({ component: { fabOn } }: StoreState, ownProps: OwnProps) => ({
    fabOn,
    ...ownProps,
});

type DispatchType = Dispatch<SelectUser | DeselectUser | ToggleFabOn>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    select: (name: string) => dispatch(selectUser(name)),
    deselect: (name: string) => dispatch(deselectUser(name)),
    toggleFabOn: (step: number) => dispatch(toggleFabOn(step)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
