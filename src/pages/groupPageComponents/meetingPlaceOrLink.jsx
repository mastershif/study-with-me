import Typography from "@material-ui/core/Typography";

let MeetingPlaceOrLink = (props) => {

    const {group, userID} = props;
    const inGroup = group.users.some(e => e._id === userID);

    if (group.meetingType === "וירטואלית") {
        if (!inGroup) {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה <b>במתכונת וירטואלית</b>.<br/> הקישור לפגישה יהיה זמין עבורך במידה ותירשם/י.
                    </Typography>
                </>
            );
        }
        else {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה <b>במתכונת וירטואלית</b>. הקישור לפגישה הינו: <a href={group.link} target="_blank" rel="noreferrer">{group.link}</a>
                    </Typography>
                </>
            );
        }
    }
    else if (group.meetingType === "פרונטלית") {
        if (!inGroup) {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה במתכונת פרונטלית ותתקיים בעיר: <b>{group.city}</b>. <br/>הכתובת המדויקת תהיה זמינה עבורך במידה ותירשם/י.
                    </Typography>
                </>

            );
        }
        else {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה במתכונת פרונטלית ותתקיים בכתובת: <b>{group.place}, {group.city}</b>.
                    </Typography>
                </>
            );
        }
    }
}

export default MeetingPlaceOrLink;