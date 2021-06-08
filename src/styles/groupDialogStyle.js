import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    dialog: {
        minHeight: '90vh',
        maxHeight: '90vh',
    },
    groupTitleTypo: {
        position: 'absolute',
        top: theme.spacing(2.5),
        left: theme.spacing(10),
        right: theme.spacing(12),
        fontSize: '0.9rem',
        '@media (min-width:400px)': {
            fontSize: '1.1rem',
        },
        '@media (min-width:650px)': {
            fontSize: '1.45rem',
        }
    },
    shareButton: {
        position: 'absolute',
        top: theme.spacing(1.7),
        right: theme.spacing(5)
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1.7),
        right: theme.spacing(1)
    },
}))
