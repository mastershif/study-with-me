import {Fab} from "@material-ui/core";
import * as Styles from "../../styles/groupDialogStyle";
import EditIcon from "@material-ui/icons/Edit";


const EditGroupButton = (props) => {

    const { id } = props;
    const classes = Styles.useStyles();

    return (
        <Fab className={classes.fab} href={'/editGroup/' + id}>
            {<EditIcon/>}
        </Fab>
    )
}

export default EditGroupButton;