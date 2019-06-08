import { OptionsObject } from 'notistack';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
    addCommentStart,
    AddCommentStart,
    enqueueSnackbar,
    EnqueueSnackbar,
    getResume,
    GetResume,
    removeCommentStart,
    RemoveCommentStart
} from '../../actions';
import { StoreState } from '../../reducers';

import Detail from '../../components/Detail';

import { User } from '../../config/types';

interface OwnProps {
    user: User;
    handlePrev: (index: number) => void;
    handleNext: (index: number) => void;
}

const mapStateToProps = ({ component: { resume } }: StoreState, ownProps: OwnProps) => ({
    downloadingResume: resume,
    ...ownProps,
});

type DispatchType = Dispatch<EnqueueSnackbar | AddCommentStart | RemoveCommentStart | GetResume>;

const mapDispatchToProps = (dispatch: DispatchType) => ({
    submit: (cid: string, comment: Partial<Comment>) => dispatch(addCommentStart(cid, comment)),
    remove: (name: string, id: string) => dispatch(removeCommentStart(name, id)),
    enqueueSnackbar: (message: string, options: OptionsObject = { variant: 'warning' }) => dispatch(enqueueSnackbar(message, options)),
    getResume: (cid: string) => dispatch(getResume(cid))
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
