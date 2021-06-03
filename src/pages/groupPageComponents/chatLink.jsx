import Typography from "@material-ui/core/Typography";

const ChatLink = (props) => {

    const {group, userID} = props;
    const inGroup = group.users.some(e => e._id === userID);

    if (!inGroup) {
        return (
            <Typography variant="body1" component="p">
                האפשרות לשוחח פתוחה רק למי שכבר בקבוצה
            </Typography>
        );
    } else {
        return (
            <Typography variant="body1" component="p">
                 כאן אפשר לתאם ולהתעדכן:<a href={group.link} target="_blank" rel="noreferrer">{group.link}</a>
            </Typography>
        );
    }
}

export default ChatLink;
