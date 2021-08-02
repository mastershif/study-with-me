import {Fab} from "@material-ui/core";
import * as Styles from "../../styles/groupPageStyle";
import EditIcon from "@material-ui/icons/Edit";


const EditGroupButton = (props) => {

    const { id, deleted } = props;
    const classes = Styles.useStyles();

    return (
        <Fab disabled={deleted} className={classes.fab} href={'/editGroup/' + id}>
            {<EditIcon/>}
        </Fab>
    )
}

export default EditGroupButton;
