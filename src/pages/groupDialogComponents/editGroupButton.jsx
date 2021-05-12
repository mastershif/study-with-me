import {Fab} from "@material-ui/core";
import * as Styles from "../../styles/groupDialogStyle";
import EditIcon from "@material-ui/icons/Edit";


const EditGroupButton = () => {

    const classes = Styles.useStyles();

    return (
        <Fab className={classes.fab} href={'/editGroup/609504980f10de27949b9666'}>
            {<EditIcon/>}
        </Fab>
    )
}

export default EditGroupButton;