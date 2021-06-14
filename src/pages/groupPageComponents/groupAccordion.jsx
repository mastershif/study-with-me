import {Accordion, AccordionDetails, AccordionSummary,
    Avatar, Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {format, parseISO} from "date-fns";
import he from "date-fns/locale/he";
import MeetingPlaceOrLink from "./meetingPlaceOrLink";
import {AvatarGroup} from "@material-ui/lab";
import EditGroupButton from "../groupDialogComponents/editGroupButton";
import {useState} from "react";
import * as Styles from "../../styles/groupPageStyle";
import ChatLink from "./chatLink";


const GroupAccordion = (props) => {

    const {group, userID, isGroupPage} = props;
    const [expanded, setExpanded] = useState('accord1');
    const classes = Styles.useStyles();
    const onlyInstitution = <><br/><br/>הקבוצה מיועדת לתלמידי <b>{group.institution}</b> בלבד.</>

    const handleExpand = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div className={isGroupPage ? classes.accordion : null}>
            <Accordion className={classes.expanded}
                       expanded={expanded === 'accord1'}
                       onChange={handleExpand('accord1')}>
                <AccordionSummary className={classes.accordionSummary}
                                  expandIcon={<ExpandMoreIcon/>}>
                    <Typography>פירוט</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography gutterBottom variant="body1" component="p">
                        <b>מטרת הקבוצה:</b> {group.groupPurpose}.
                        <br/><br/>{group.groupDescription}
                        {group.institution !== 'הכל' ? onlyInstitution : '' }
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.expanded}
                       expanded={expanded === 'accord2'}
                       onChange={handleExpand('accord2')}>
                <AccordionSummary className={classes.accordionSummary}
                                  expandIcon={<ExpandMoreIcon/>}>
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
            <Accordion className={classes.expanded}
                       expanded={expanded === 'accord3'}
                       onChange={handleExpand('accord3')}>
                <AccordionSummary className={classes.accordionSummary}
                                  expandIcon={<ExpandMoreIcon/>}>
                    <Typography>מיקום / קישור</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <MeetingPlaceOrLink group={group} userID={userID} />
                </AccordionDetails>
            </Accordion>
            <Accordion className={classes.expanded}
                       expanded={expanded === 'accord4'}
                       onChange={handleExpand('accord4')}>
                <AccordionSummary className={classes.accordionSummary}
                                  expandIcon={<ExpandMoreIcon/>}>
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
            <Accordion className={classes.expanded}
                       expanded={expanded === 'accord5'}
                       onChange={handleExpand('accord5')}>
                <AccordionSummary className={classes.accordionSummary}
                                  expandIcon={<ExpandMoreIcon/>}>
                    <Typography>תיאומים ועדכונים</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ChatLink group={group} userID={userID} />
                </AccordionDetails>
            </Accordion>
            {group.admin === userID ? <EditGroupButton id={group._id} /> : null }
        </div>
    )
}

export default GroupAccordion;
