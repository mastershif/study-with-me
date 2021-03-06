import Typography from "@material-ui/core/Typography";

const ChatLink = (props) => {

    const {group, userID} = props;
    const inGroup = group.users.some(e => e._id === userID);


    if (!inGroup) {
        return (
            <Typography variant="body1" component="p">
                האפשרות לשוחח פתוחה רק למי שרשום לקבוצה.
            </Typography>
        );
    } else {
        if (group.communicationChannel !== undefined && group.communicationChannel.length > 0) {
            return (
                <Typography variant="body1" component="p">
                    כאן אפשר לתאם ולהתעדכן: <a href={group.communicationChannel} target="_blank" rel="noreferrer">{group.communicationChannel}</a>
                </Typography>
            );
        } else {
            return (
                <Typography variant="body1" component="p">
                    מנהל/ת הקבוצה לא סיפק/ה דרכי התקשרות.
                </Typography>
            );
        }
    }
}

export default ChatLink;
