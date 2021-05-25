import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    page: {
        marginTop: theme.spacing(3)
    },
    card: {
        position: 'relative',
        width: '90%',
        '@media (min-width:650px)': {
            width: '50%'
        },
        margin: "auto",
        minHeight: '80vh',
        maxHeight: '80vh',
        borderRadius: '7px',
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)'
    },
    occupancyStatus: {
        margin: theme.spacing(2)
    },
    groupTitleTypo: {
        position: 'absolute',
        top: theme.spacing(1.8),
        left: theme.spacing(10),
        right: theme.spacing(10),
        fontSize: '0.9rem',
        '@media (min-width:400px)': {
            fontSize: '1.2rem',
        },
        '@media (min-width:720px)': {
            fontSize: '1.3rem',
        },
        '@media (min-width:1000px)': {
            fontSize: '1.5rem',
        }
    },
    shareButton: {
        position: 'absolute',
        top: theme.spacing(1.5),
        right: theme.spacing(2)
    },
    accordion: {
        margin: theme.spacing(2)
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
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(7),
        right: theme.spacing(2),
        backgroundColor: theme.palette.success.main,
        color: 'white'
    },
    groupButtons: {
        position: 'absolute',
        bottom: theme.spacing(0),
        minWidth: '100%'
    }
}))
