import GroupOccupancyStatus from "./groupOccupancyStatus";
import {IconButton, Menu, MenuItem, Typography} from "@material-ui/core";
import ShareIcon from "@material-ui/icons/Share";
import {EmailIcon, EmailShareButton, FacebookIcon,
    FacebookShareButton, WhatsappIcon, WhatsappShareButton} from "react-share";
import CloseIcon from "@material-ui/icons/Close";
import * as StylesPage from "../../styles/groupPageStyle";
import * as StylesDialog from "../../styles/groupDialogStyle";

import {useState} from "react";


const GroupHeader = (props) => {

    const {group, onClose, isGroupPage} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const classesPage = StylesPage.useStyles();
    const classesDialog = StylesDialog.useStyles();
    const shareURL = `${window.location.origin}/group/${group._id}`

    const openShare = (event) => {setAnchorEl(event.currentTarget);}
    const closeShare = () => { setAnchorEl(null); };

    return (
        <>
            <GroupOccupancyStatus currentGroupSize={group.users.length}
                                  maxGroupSize={group.groupSize} isGroupPage={isGroupPage} />
            <Typography className={isGroupPage ? classesPage.groupTitleTypo : classesDialog.groupTitleTypo}
                        gutterBottom variant="h5" component="p">
                {group.groupTitle}
            </Typography>
            {openShare ? (
                <>
                    <IconButton className={isGroupPage ? classesPage.shareButton : classesDialog.shareButton}
                                title={'שיתוף'} onClick={openShare}>
                        <ShareIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} keepMounted
                          open={Boolean(anchorEl)} onClose={closeShare}>
                        <MenuItem>
                            <FacebookShareButton url={shareURL}
                                                 quote={`${group.groupTitle}. ${group.groupDescription}`}>
                                <FacebookIcon size={'2.5rem'} round/>
                            </FacebookShareButton>
                        </MenuItem>
                        <MenuItem>
                            <WhatsappShareButton url={shareURL}
                                                 title={`${group.groupTitle}. ${group.groupDescription}`}>
                                <WhatsappIcon size={'2.5rem'} round />
                            </WhatsappShareButton>
                        </MenuItem>
                        <MenuItem>
                            <EmailShareButton url={shareURL}
                                              subject={group.groupTitle} body={group.groupDescription}>
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