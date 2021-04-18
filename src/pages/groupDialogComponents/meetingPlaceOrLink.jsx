import Typography from "@material-ui/core/Typography";

let MeetingPlaceOrLink = (props) => {

    const {group, showLinkOrLocation} = props;

    if (group.meetingType === "וירטואלית") {
        if (showLinkOrLocation === false) {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה <b>במתכונת וירטואלית</b>.<br/> במידה ותירשם/י, הקישור לפגישה יהיה זמין עבורך ב"קבוצות שלי" בעמוד הפרופיל.
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
        if (showLinkOrLocation === false) {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה במתכונת פרונטלית ותתקיים בעיר: <b>{group.city}</b>. <br/>במידה ותירשם/י, הכתובת המדויקת תהיה זמינה עבורך ב"קבוצות שלי" בעמוד הפרופיל.
                    </Typography>
                </>

            );
        }
        else {
            return (
                <>
                    <Typography variant="body1" component="p">
                        הפגישה הינה במתכונת פרונטלית ותתקיים בכתובת: <b>{group.place}</b>.
                    </Typography>
                </>
            );
        }
    }
}

export default MeetingPlaceOrLink;