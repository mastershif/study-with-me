import * as Styles from "../../styles/groupProfileStyle";
import { Button, Card, CardContent, CardHeader } from "@material-ui/core";
import GroupOccupancyStatus from "../groupPageComponents/groupOccupancyStatus";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import CheckIcon from '@material-ui/icons/CheckCircleOutlined';
import AdminIcon from '@material-ui/icons/AccountCircleOutlined';
import he from "date-fns/locale/he";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import GroupDialog from "../groupDialog";

const GroupProfile = (props) => {
    const { group, isProfile, userID, oAuthConsentUrl } = props;
    const classes = Styles.useStyles();
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const handleOpenDialog = () => {
        setDialogIsOpen(true);
    };
    const handleCloseDialog = () => {
        setDialogIsOpen(false);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <GroupOccupancyStatus
                        currentGroupSize={group.users.length}
                        maxGroupSize={group.groupSize}
                        isGroupPage={false}
                    />
                }
                title={<Styles.Title>{group.groupTitle}</Styles.Title>}
                subheader={`פגישה ${group.meetingType}`}
            />
            <CardContent>
                <Styles.CardRow>
                    <TodayOutlinedIcon />
                    <Styles.Text>
                        {format(parseISO(group.date), "EEEE, 'ה-'d 'ב'MMMM yyyy", {locale: he})}
                    </Styles.Text>
                </Styles.CardRow>
                <Styles.CardRow>
                    <AccessTimeOutlinedIcon />
                    <Styles.Text>
                        מ-{format(parseISO(group.startHour), "HH:mm", { locale: he })} עד{" "}
                        {format(parseISO(group.endHour), "HH:mm", { locale: he })}
                    </Styles.Text>
                </Styles.CardRow>
            </CardContent>
            {group.admin === userID ?
                <AdminIcon titleAccess={"הנך מנהל/ת הקבוצה"} className={classes.adminIcon}
                           fontSize={"large"} /> : isProfile ? null : group.users.some(e => e._id === userID) ?
                    <CheckIcon titleAccess={"הנך חבר/ה בקבוצה"}
                               className={classes.userIcon} fontSize={"large"} /> : null}
            <Button className={classes.moreInfo}
                    variant={"outlined"} color={"primary"}
                    size={"large"} onClick={handleOpenDialog}>
                מידע נוסף
            </Button>
            <GroupDialog group={group} onClose={handleCloseDialog}
                         isProfile={isProfile} open={dialogIsOpen} userID={userID} oAuthConsentUrl={oAuthConsentUrl}/>
        </Card>
    );
};

export default GroupProfile;
