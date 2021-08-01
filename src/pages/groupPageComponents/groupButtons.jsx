import DeleteButton from "../groupDialogComponents/deleteButton";
import LeaveButton from "../groupDialogComponents/leaveButton";
import JoinButton from "../groupDialogComponents/joinButton";


const GroupButtons = (props) => {

    const {group, userID, isProfile, isGroupPage} = props;

    return (
        <>
            {group.admin === userID ?
                <DeleteButton disabled={group.deleted} group={group}
                              groupId={group._id} isGroupPage={isGroupPage} /> :
                group.users.some(e => e._id === userID) ?
                    <LeaveButton disabled={group.deleted} groupId={group._id}
                                 isProfile={isProfile} isGroupPage={isGroupPage} /> :
                    <JoinButton disabled={group.deleted} group={group}
                                groupId={group._id} isGroupPage={isGroupPage} />}
        </>
    )
}

export default GroupButtons;
