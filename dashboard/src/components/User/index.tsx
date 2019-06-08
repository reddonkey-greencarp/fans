import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import InfoIcon from '@material-ui/icons/InfoOutlined';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

import { User as UserType } from '../../config/types';
import styles from '../../styles/user';

interface Props extends WithStyles<typeof styles> {
    user: UserType;
    provided: DraggableProvided;
    selected: string[];
    fabOn: number;
    select: (cid: string) => void;
    deselect: (cid: string) => void;
    toggleFabOn: (step: number) => void;
    toggleDetail: () => void;
}

class User extends PureComponent<Props> {
    state = {
        checked: false,
        anchorEl: undefined,
    };

    handleOpen = ({ currentTarget }: React.MouseEvent) => {
        this.setState({ anchorEl: currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: undefined });
    };

    handleCheck = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
        const { user: { _id, step }, toggleFabOn, select, deselect } = this.props;
        this.setState({
            checked,
        });
        if (checked) {
            select(_id);
            toggleFabOn(step);
        } else {
            deselect(_id);
        }
    };

    handleToggle = () => {
        const { toggleDetail } = this.props;
        toggleDetail();
    };

    stopPropagation = (event: React.MouseEvent) => {
        event.stopPropagation();
    };

    render() {
        const { user, selected, classes, provided, fabOn } = this.props;
        const { name, step, _id } = user;
        const { innerRef, draggableProps, dragHandleProps } = provided;

        return (
            <div
                onMouseOver={this.handleOpen}
                onMouseOut={this.handleClose}
                ref={innerRef}
                className={classes.cardContainer}
                {...draggableProps}
                {...dragHandleProps}
            >
                <Card className={classes.card} onClick={this.handleToggle}>
                    <div className={classes.cardContent}>
                        <Checkbox
                            color='primary'
                            onClick={this.stopPropagation}
                            onChange={this.handleCheck}
                            checked={selected.includes(_id)}
                            disabled={(selected.length !== 0 && fabOn !== step)}
                        />
                        <span className={classes.cardTitle}>
                            <Typography variant='h6'>
                                {name}
                            </Typography>
                        </span>
                        <IconButton
                            className={classes.iconButton}
                            onClick={this.handleToggle}
                        >
                            <InfoIcon />
                        </IconButton>
                    </div>
                </Card>
            </div>
        );
    }
}

export default withStyles(styles)(User);
