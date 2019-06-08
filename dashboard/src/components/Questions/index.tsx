import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import withStyles, { WithStyles } from '@material-ui/styles/withStyles';
import React, { PureComponent } from 'react';

import { Question } from '../../config/types';
import styles from '../../styles/questions';

interface Props extends WithStyles<typeof styles> {
    questions: Question[];
    setQuestions: (questions: Question[]) => void;
    handleClose: () => void;
}

const getDefaultQuestion = () => ({
    content: '',
    selections: ['', '', '', '']
});

class Questions extends PureComponent<Props> {

    state = {
        questions: this.props.questions.length ? this.props.questions : [getDefaultQuestion()]
    };

    setQuestions = (questions: Question[]) => {
        this.setState({
            questions
        });
    };

    getQuestions = () => {
        return [...this.state.questions];
    };

    addQuestion = () => {
        const questions = this.getQuestions();
        questions.push(getDefaultQuestion());
        this.setQuestions(questions);
    };

    setQuestion = (id: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const questions = this.getQuestions();
        if (questions) {
            questions[id].content = event.target.value;
            this.setQuestions(questions);
        }
    };

    deleteQuestion = (id: number) => () => {
        const questions = this.getQuestions();
        questions.splice(id, 1);
        this.setQuestions(questions);
    };

    setSelections = (id: number, option: number) => ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
        const questions = this.getQuestions();
        questions[id].selections[option] = value;
        this.setQuestions(questions);
    };

    submit = () => {
        this.props.setQuestions(this.state.questions);
    };

    render() {
        const { classes, handleClose } = this.props;
        const { questions } = this.state;
        return (
            <div className={classes.questions}>
                <div className={classes.buttonContainer}>
                    <Button onClick={this.addQuestion} color='primary' variant='contained'>增加</Button>
                    <Button onClick={handleClose} color='primary' variant='contained'>取消</Button>
                    <Button onClick={this.submit} color='primary' variant='contained'>提交</Button>
                </div>
                {questions.map(({ content, selections }, index) =>
                    <div key={index}>
                        <div className={classes.textFieldContainer}>
                            <TextField
                                label='问题'
                                value={content}
                                onChange={this.setQuestion(index)}
                            />
                            <Button
                                className={classes.button}
                                color='primary'
                                variant='contained'
                                onClick={this.deleteQuestion(index)}
                            >删除</Button>
                        </div>
                        <div className={classes.textFieldContainer}>
                            <TextField
                                label='A'
                                value={selections[0]}
                                className={classes.textField}
                                onChange={this.setSelections(index, 0)}
                            />
                            <TextField
                                label='B'
                                value={selections[1]}
                                className={classes.textField}
                                onChange={this.setSelections(index, 1)}
                            />
                            <TextField
                                label='C'
                                value={selections[2]}
                                className={classes.textField}
                                onChange={this.setSelections(index, 2)}
                            />
                            <TextField
                                label='D'
                                value={selections[3]}
                                className={classes.textField}
                                onChange={this.setSelections(index, 3)}
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(Questions);
