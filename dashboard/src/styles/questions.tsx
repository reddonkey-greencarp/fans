import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/styles';

const styles = ({ spacing, breakpoints }: Theme) => createStyles({

    paper: {
        flexDirection: 'column',
        margin: `${spacing(2)}px 0`,
        width: '45%',
        [breakpoints.down('md')]: {
            width: '100%',
            minWidth: 400
        },
        display: 'inline-block',
        height: '100%',
        verticalAlign: 'top'
    },
    data: {
        margin: spacing(2),
        display: 'flex',
        flexDirection: 'column'
    },
    textFieldContainer: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        margin: spacing(1),
        [breakpoints.down('md')]: {
            maxWidth: 500
        },
    },
    textField: {
        width: 50,
    },
    questions: {
        flexDirection: 'row',
    },
    datePicker: {
        margin: spacing(1),
        width: 150,
        [breakpoints.down('md')]: {
            margin: spacing(0.5),
            width: 90,
        },
    },
    dateSelection: {
        margin: spacing(1),
        width: 150,
    },
    buttonContainer: {
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        margin: spacing(1),
        [breakpoints.down('md')]: {
            maxWidth: 500
        },
    },
    tableButtons: {
        display: 'inline-block',
        marginLeft: 'auto',
    },
    tableContainer: {
        overflowX: 'auto',
    },
    table: {
        marginBottom: spacing(1),
        minWidth: 400
    },
    tableCell: {
        padding: spacing(1),
        textAlign: 'center',
    },
    title: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    dialog: {
        margin: spacing(2),
        display: 'flex',
        alignItems: 'baseline'
    },
    button: {
        marginLeft: spacing(1)
    }
});

export default styles;
