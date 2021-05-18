import * as Styles from "../styles/groupDialogStyle"
import {
    Accordion, AccordionDetails, AccordionSummary, Avatar, Menu, MenuItem,
    Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography
} from "@material-ui/core";
import {AvatarGroup} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import he from "date-fns/locale/he";
import GroupOccupancyStatus from "./groupDialogComponents/groupOccupancyStatus";
import MeetingPlaceOrLink from "./groupDialogComponents/meetingPlaceOrLink"
import {useState} from "react";
import {WhatsappShareButton, FacebookShareButton, EmailShareButton,
    WhatsappIcon, FacebookIcon, EmailIcon} from "react-share";
import { format, parseISO } from "date-fns";
import JoinButton from "./groupDialogComponents/joinButton";
import LeaveButton from "./groupDialogComponents/leaveButton";
import DeleteButton from "./groupDialogComponents/deleteButton";
import EditGroupButton from "./groupDialogComponents/editGroupButton";


const GroupDialog = (props) => {

    const {group, open, onClose, isProfile, userID} = props;
    const classes = Styles.useStyles();
    const [expanded, setExpanded] = useState('accord1');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleExpand = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const openShare = (event) => {setAnchorEl(event.currentTarget);}
    const closeShare = () => { setAnchorEl(null); };

    return (
        <Dialog classes={{paper: classes.dialog}} onClose={onClose} open={open} fullWidth>
            <DialogTitle onClose={onClose}>
                <GroupOccupancyStatus currentGroupSize={group.users.length}
                                      maxGroupSize={group.groupSize} />
                <Typography className={classes.groupTitleTypo} gutterBottom variant="h5" component="p">
                    {group.groupTitle}
                </Typography>
                {openShare ? (
                    <>
                        <IconButton className={classes.shareButton} title={'שיתוף'} onClick={openShare}>
                            <ShareIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} keepMounted
                              open={Boolean(anchorEl)} onClose={closeShare}>
                            <MenuItem>
                                <FacebookShareButton quote={group.groupTitle}>
                                    <FacebookIcon size={'2.5rem'} round/>
                                </FacebookShareButton>
                            </MenuItem>
                            <MenuItem>
                                <WhatsappShareButton title={group.groupTitle} separator=":: ">
                                    <WhatsappIcon size={'2.5rem'} round />
                                </WhatsappShareButton>
                            </MenuItem>
                            <MenuItem>
                                <EmailShareButton subject={group.groupTitle} body="body">
                                    <EmailIcon size={'2.5rem'} round />
                                </EmailShareButton>
                            </MenuItem>
                        </Menu>
                    </>
                ) : null}
                {onClose ? (
                    <IconButton className={classes.closeButton} onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent dividers>
                <Accordion className={classes.expanded} expanded={expanded === 'accord1'}
                           onChange={handleExpand('accord1')}>
                    <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography>פירוט</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography gutterBottom variant="body1" component="p">
                            <b>מטרת הקבוצה:</b> {group.groupPurpose}.<br/><br/>{group.groupDescription}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.expanded} expanded={expanded === 'accord2'}
                           onChange={handleExpand('accord2')}>
                    <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography>תאריך ושעה</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="body1" component="p">
                                    הפגישה תתקיים <b>ב{format(parseISO(group.date), "EEEE, 'ה-'d 'ב'MMMM yyyy", {locale: he})}</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={12} style={{marginTop: '10px'}}>
                                <Grid container>
                                    <Grid item xs={12} sm={4}>
                                        <Typography variant="body1" component="p">
                                            שעת התחלה: <b>{format(parseISO(group.startHour), "HH:mm", {locale: he})}</b>
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="body1" component="p">
                                            שעת סיום: <b>{format(parseISO(group.endHour), "HH:mm", {locale: he})}</b>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.expanded} expanded={expanded === 'accord3'}
                           onChange={handleExpand('accord3')}>
                    <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography>מיקום / קישור</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <MeetingPlaceOrLink group={group} userID={userID} />
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.expanded} expanded={expanded === 'accord4'}
                           onChange={handleExpand('accord4')}>
                    <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography>חברי הקבוצה</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AvatarGroup max={6}>
                            {group.users.map(user => (
                                <Avatar key={user._id} alt={user.name}
                                        title={user.name} src={user.imageUrl} />
                            ))}
                        </AvatarGroup>
                    </AccordionDetails>
                </Accordion>
                {group.admin === userID ? <EditGroupButton id={group._id} /> : null }
            </DialogContent>
            {group.admin === userID ? <DeleteButton group={group} groupId={group._id} /> :
                group.users.some(e => e._id === userID) ? <LeaveButton groupId={group._id} isProfile={isProfile} /> :
                    <JoinButton group={group} groupId={group._id} /> }
        </Dialog>
    )
}

export default GroupDialog;
