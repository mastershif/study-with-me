import * as Styles from "../../styles/groupProfileStyle";
import { Button, Card, CardContent, CardHeader } from "@material-ui/core";
import GroupOccupancyStatus from "./groupOccupancyStatus";
import TodayOutlinedIcon from "@material-ui/icons/TodayOutlined";
import AccessTimeOutlinedIcon from "@material-ui/icons/AccessTimeOutlined";
import he from "date-fns/locale/he";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import GroupDialog from "../groupDialog";

const GroupProfile = (props) => {
    const { group, isProfile, userID } = props;
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
            <Button
                variant={"outlined"}
                color={"primary"}
                size={"large"}
                onClick={handleOpenDialog}
            >
                מידע נוסף
            </Button>
            <GroupDialog
                group={group}
                isProfile={isProfile}
                onClose={handleCloseDialog}
                open={dialogIsOpen}
                userID={userID}
            />
        </Card>
    );
};

export default GroupProfile;
