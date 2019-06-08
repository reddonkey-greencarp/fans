import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/styles';

const styles = ({ breakpoints, spacing }: Theme) => createStyles({
    datePicker: {
        width: 200,
        [breakpoints.down('xs')]: {
            width: 150,
        },
        margin: spacing(1),
    },
    textField: {
        margin: spacing(1),
    },
    button: {
        margin: spacing(1),
    },
    div: {
        margin: spacing(1),
        display: 'flex',
        justifyContent: 'space-around',
    },
});

export default styles;
