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
        right: theme.spacing(10)
    },
    shareButton: {
        position: 'absolute',
        top: theme.spacing(1.7),
        right: theme.spacing(6)
    },
    closeButton: {
        position: 'absolute',
        top: theme.spacing(1.7),
        right: theme.spacing(1)
    },
    accordionSummary: {
        backgroundColor: theme.palette.background.default,
        "&:hover": {
            boxShadow: '0 0 3px 0 rgba(0, 0, 0, 0.2)'
        }
    },
    expanded: {
        "&$expanded": {
            margin: 0
        }
    }
}))
