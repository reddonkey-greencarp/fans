import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

import TextField from '@material-ui/core/TextField';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { withStyles, WithStyles } from '@material-ui/styles';
import { OptionsObject } from 'notistack';
import React, { PureComponent } from 'react';
import { Offline as IOffline } from '../../config/types';
import styles from '../../styles/offline';
import EnlargeableImage from '../EnlargeableImg';

interface Props extends WithStyles<typeof styles> {
    offline?: IOffline;
    setOffline: (offline: IOffline) => void;
    enqueueSnackbar: (info: string, options: OptionsObject) => void;
    handleClose: () => void;
}

class Offline extends PureComponent<Props, IOffline> {

    state = this.props.offline ? { ...this.props.offline } : {
        description: '',
        image: ''
    };

    setDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            description: event.target.value
        });
    };

    handleImage = ({ target: { files } }: React.ChangeEvent<HTMLInputElement>) => {
        const { enqueueSnackbar } = this.props;
        if (!files) {
            enqueueSnackbar('你没有上传任何图片', { variant: 'info' });
            return;
        }
        const file = files[0];
        const extension = file.name.split('.').slice(-1)[0];
        if (!['jpg', 'jpeg', 'png'].includes(extension)) {
            enqueueSnackbar('请上传jpg或png类型的图片', { variant: 'info' });
            return;
        }
        if (file.size > 1024 * 1024 * 10) {
            enqueueSnackbar('图片大小必须小于5MB', { variant: 'info' });
            return;
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.setState({
                image: reader.result as string
            });
        };
    };

    resetInput = ({ currentTarget }: React.MouseEvent<HTMLInputElement>) => {
        currentTarget.value = '';
    };

    setSchedule = () => {
        this.props.setOffline(this.state);
    };

    render() {
        const { classes, handleClose } = this.props;
        const offline = this.state;
        const { description, image } = offline;
        return (
            <>
                <div className={classes.div}>
                    <TextField
                        label='描述'
                        value={description}
                        onChange={this.setDescription}
                    />
                    <input accept='image/png, image/jpeg' className={classes.hidden} id='file' type='file'
                           onChange={this.handleImage} onClick={this.resetInput} />
                    <label htmlFor='file'>
                        <IconButton color='primary' component='span'>
                            <InsertPhotoIcon />
                        </IconButton>
                    </label>
                </div>
                <Typography variant='caption' color='primary' className={classes.typography}>{image ? '图片预览' : '图片未上传'}</Typography>
                <div className={classes.div}>
                    <EnlargeableImage src={image} />
                </div>
                <div className={classes.div}>
                    <Button color='primary' variant='contained' onClick={this.setSchedule}>提交</Button>
                    <Button color='primary' variant='contained' onClick={handleClose}>取消</Button>
                </div>
            </>
        );
    }
}

export default withStyles(styles)(Offline);
