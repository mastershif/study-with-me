import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FailedOnLoginDialog(props) {
    const {open, setOpen, message} = props;

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
        {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Slide in alert dialog
        </Button> */}
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"שכחת להתחבר!"}</DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                {message}
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                הבנתי
            </Button>
            <Button href="/signin" color="primary">
                התחבר
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}