import { Theme } from '@material-ui/core';
import { createStyles } from '@material-ui/styles';

const styles = ({ spacing }: Theme) => createStyles({
    hidden: {
        display: 'none'
    },
    div: {
        margin: spacing(1),
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: 500
    },
    typography: {
        margin: spacing(1)
    }
});

export default styles;
