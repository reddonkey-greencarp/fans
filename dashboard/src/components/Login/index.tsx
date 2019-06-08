import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';

import styles from '../../styles/login';

import Modal from '../Modal';
import Progress from '../Progress';

interface Props extends WithStyles<typeof styles> {
    loggedIn: boolean;
    isLoading: boolean;
    weChatKey: string;
    isScanning: boolean;
    login: (phone: string, password: string) => void;
}

class Login extends PureComponent<Props> {

    state = {
        phone: '',
        password: ''
    };

    login = () => {
        const { phone, password } = this.state;
        this.props.login(phone, password);
    };

    handleChange = (name: string) => (event: React.ChangeEvent) => {
        this.setState({
            [name]: event.target['value'],
        });
    };

    render() {
        const { classes, loggedIn, isLoading } = this.props;
        const { phone, password } = this.state;
        return (
            !loggedIn ? <div className={classes.container}>
                <Modal open title='登录' hideBackdrop>
                    <div className={classes.login}>
                        <TextField
                            label='手机号'
                            value={phone}
                            onChange={this.handleChange('phone')}
                            margin='normal'
                        />
                        <TextField
                            label='密码'
                            value={password}
                            type='password'
                            onChange={this.handleChange('password')}
                            margin='normal'
                        />
                        <Button color='primary' size='large' onClick={this.login} disabled={!phone || !password}>登录</Button>
                    </div>
                </Modal>
                {isLoading && <Progress />}
            </div> : <Redirect to='/' />
        );
    }
}

export default withStyles(styles)(Login);
