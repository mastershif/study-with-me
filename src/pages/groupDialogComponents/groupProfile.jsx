import * as Styles from "../../styles/groupProfileStyle"
import {Button, Card, CardContent, CardHeader} from "@material-ui/core";
import GroupOccupancyStatus from "./groupOccupancyStatus";
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import he from 'date-fns/locale/he';
import {format} from 'date-fns';
import {useState} from "react";
import GroupDialog from "../groupDialog";

const GroupProfile = (props) => {

    const {group, isProfile} = props;
    const classes = Styles.useStyles();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogIsOpen(true);
    }
    const handleCloseDialog = () => {
        setDialogIsOpen(false);
    }

    return (
        <Card className={classes.root}>
            <CardHeader avatar={<GroupOccupancyStatus currentGroupSize={group.currentGroupSize}
                                                      maxGroupSize={group.maxGroupSize} />}
                        title={<Styles.Title>{group.groupTitle}</Styles.Title>}
                        subheader={`פגישה ${group.meetingType}`}/>
            <CardContent>
                <Styles.CardRow>
                    <TodayOutlinedIcon/>
                    <Styles.Text>
                        {format(group.date, "EEEE, 'ה-'d 'ב'MMMM yyyy", {locale: he})}
                    </Styles.Text>
                </Styles.CardRow>
                <Styles.CardRow>
                    <AccessTimeOutlinedIcon/>
                    <Styles.Text>
                        מ-{group.startHour} עד {group.endHour}
                    </Styles.Text>
                </Styles.CardRow>
            </CardContent>
            <Button variant={"outlined"} color={"primary"}
                    size={"large"} onClick={handleOpenDialog}>מידע נוסף</Button>
            <GroupDialog group={group} isProfile={isProfile}
                         onClose={handleCloseDialog} open={dialogIsOpen}/>
        </Card>
    )
}

export default GroupProfile;