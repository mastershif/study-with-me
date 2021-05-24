import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from "@material-ui/core";


const FailedOnLoginAlert = (props) => {

    const {open, setOpen, message} = props;

    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'top', horizontal: "center" }}>
            <Alert severity="info" onClose={() => { setOpen(false) }}>
                <AlertTitle>שכחת להתחבר!</AlertTitle>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default FailedOnLoginAlert;
