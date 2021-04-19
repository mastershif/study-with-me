import * as Styles from "../styles/groupDialogStyle"
import {
    Accordion, AccordionDetails, AccordionSummary, Button,
    Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, Avatar, Menu, MenuItem
} from "@material-ui/core";
import {AvatarGroup} from '@material-ui/lab';
import CloseIcon from '@material-ui/icons/Close';
import ShareIcon from '@material-ui/icons/Share';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import he from "date-fns/locale/he";
import GroupOccupancyStatus from "./groupDialogComponents/groupOccupancyStatus";
import MeetingPlaceOrLink from "./groupDialogComponents/meetingPlaceOrLink"
import {useState} from "react";
import {WhatsappShareButton, FacebookShareButton, EmailShareButton,
    WhatsappIcon, FacebookIcon, EmailIcon} from "react-share";

const GroupDialog = (props) => {

    const {group, showLinkOrLocation, open, onClose} = props;
    const classes = Styles.useStyles();
    const [expanded, setExpanded] = useState('accord1');
    const [anchorEl, setAnchorEl] = useState(null);

    const handleExpand = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const openShare = (event) => {setAnchorEl(event.currentTarget);}
    const closeShare = () => {setAnchorEl(null);};

    return (
        <Dialog classes={{paper: classes.dialog}} onClose={onClose} open={open} fullWidth>
            <DialogTitle onClose={onClose}>
                <GroupOccupancyStatus currentGroupSize={group.currentGroupSize}
                                      maxGroupSize={group.maxGroupSize} />
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
                            <Grid item xs={12} sm={8}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
                                    <DatePicker readOnly disableToolbar
                                                leftArrowIcon={false} rightArrowIcon={false}
                                                variant="static" value={group.date} onChange={() => undefined}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12} sm={4} style={{margin: 'auto'}}>
                                <Grid container>
                                    <Grid item xs={6} sm={12}>
                                        <Typography variant="body1" component="p">
                                            <u>שעת התחלה:</u> {group.startHour}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6} sm={12}>
                                        <Typography variant="body1" component="p">
                                            <u>שעת סיום:</u> {group.endHour}
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
                        <MeetingPlaceOrLink group={group} showLinkOrLocation={showLinkOrLocation} />
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.expanded} expanded={expanded === 'accord4'}
                           onChange={handleExpand('accord4')}>
                    <AccordionSummary className={classes.accordionSummary} expandIcon={<ExpandMoreIcon/>}>
                        <Typography>חברי הקבוצה</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AvatarGroup max={6}>
                            {group.people.map(people => (
                                <Avatar alt={people.name} title={people.name} src={people.photo} />
                            ))}
                        </AvatarGroup>
                    </AccordionDetails>
                </Accordion>
            </DialogContent>
            <Button variant={"contained"} color={"primary"} size={"large"}
                    startIcon={<AddIcon />}>הצטרפות לקבוצה</Button>
        </Dialog>
    )
}

export default GroupDialog;