import GroupOccupancyStatus from "./groupOccupancyStatus";
import {IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import {EmailIcon, EmailShareButton, FacebookIcon,
    FacebookShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";
import CloseIcon from "@material-ui/icons/Close";
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import * as StylesPage from "../../styles/groupPageStyle";
import * as StylesDialog from "../../styles/groupDialogStyle";
import {useState} from "react";
import {format, parseISO} from "date-fns";
import he from "date-fns/locale/he";


const GroupHeader = (props) => {

    const {group, onClose, isGroupPage, userID, oAuthConsentUrl} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const classesPage = StylesPage.useStyles();
    const classesDialog = StylesDialog.useStyles();
    const shareURL = `${window.location.origin}/group/${group._id}`
    const shareMessage = "הצטרפ/י לקבוצת הלימוד שלנו!\n" +
        "שם הקבוצה: " + group.groupTitle + "\n" +
        "תיאור הקבוצה: " + group.groupDescription + "\n" +
        "זמני פגישת הקבוצה: " + format(parseISO(group.date), "EEEE, 'ה-'d 'ב'MMMM yyyy", {locale: he}) +
        ", מ-" + format(parseISO(group.startHour), "HH:mm", { locale: he }) +
        " עד " + format(parseISO(group.endHour), "HH:mm", { locale: he }) + ".\n" +
        "לינק להצטרפות:"

    const openShare = (event) => {setAnchorEl(event.currentTarget);}
    const closeShare = () => { setAnchorEl(null); };

    const insertGroupEvent = () => {
        // window.location.href = oAuthConsentUrl;
        fetch("http://localhost:5000/calendarSync", {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              groupID: group._id
            }),
          })
              .then((response) => response.text())
              .then((data) => window.location.href=data)
              .catch((error) => console.log(error));
    }

    return (
        <>
            <GroupOccupancyStatus currentGroupSize={group.users.length}
                                  maxGroupSize={group.groupSize} isGroupPage={isGroupPage} />
            <Typography className={isGroupPage ? classesPage.groupTitleTypo : classesDialog.groupTitleTypo}
                        gutterBottom variant="h5" component="p">
                {group.groupTitle}
            </Typography>
            { group.users.some(e => e._id === userID) ?
                    <IconButton className={isGroupPage ? classesPage.syncButton : classesDialog.syncButton}
                        title={'הכנס פגישה ל - Google Calendar'} onClick={insertGroupEvent}>
                        <InsertInvitationIcon />
                    </IconButton> : null }
            {openShare ? (
                <>
                    <IconButton className={isGroupPage ? classesPage.shareButton : classesDialog.shareButton}
                                title={'שיתוף'} onClick={openShare}>
                        <ShareIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} keepMounted
                          open={Boolean(anchorEl)} onClose={closeShare}>
                        <MenuItem>
                            <FacebookShareButton url={shareURL} quote={shareMessage}>
                                <FacebookIcon size={'2.5rem'} round/>
                            </FacebookShareButton>
                        </MenuItem>
                        <MenuItem>
                            <WhatsappShareButton url={shareURL} title={shareMessage}>
                                <WhatsappIcon size={'2.5rem'} round />
                            </WhatsappShareButton>
                        </MenuItem>
                        <MenuItem>
                            <EmailShareButton url={shareURL}
                                              subject={group.groupTitle} body={shareMessage}>
                                <EmailIcon size={'2.5rem'} round />
                            </EmailShareButton>
                        </MenuItem>
                    </Menu>
                </>
            ) : null}
            {onClose ? (
                <IconButton className={isGroupPage ? null : classesDialog.closeButton}
                            onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </>
    )
}

export default GroupHeader;