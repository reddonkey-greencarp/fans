import blue from '@material-ui/core/colors/blue';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import { createStyles } from '@material-ui/styles';

const styles = ({ zIndex }: Theme) => createStyles({
    progress: {
        position: 'fixed',
        zIndex: zIndex.modal + 1,
        top: 0,
        left: 0,
        width: '100%',
    },
    color: {
        backgroundColor: blue[500]
    },
    barColor: {
        backgroundColor: blue[100]
    }
});

export default styles;
