import {useState} from "react";
import * as Styles from "../styles/createGroupStyle"
import {Grid, TextField, Checkbox, Paper, Button, RadioGroup, Radio,
    FormControlLabel, FormControl, FormLabel, FormGroup, ButtonGroup} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ClockIcon from "@material-ui/icons/AccessTime";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import theme from "../styles/theme";
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

const useStyles = makeStyles(newStyle => ({
    page: {
        margin: newStyle.spacing(5),
        padding: newStyle.spacing(3),
        border: '2px solid',
        borderRadius: '7px',
        borderColor: theme.palette.primary.main,
        boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.3)'
    },
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: newStyle.spacing(0.5)
        }
    },
}))

const initialValues = {
    groupTitle: '',
    groupDescription: '',
    groupSize: null,
    date: null,
    startHour: null,
    endHour: null,
    isVirtual: 'frontal',
    place: '',
    link: '',
    institution: false,
    calendar: false
}

const CreateGroup = () => {

    const [values, setValues] = useState(initialValues);
    const classes = useStyles();

    const handleChange = event => {
        const {name, value} = event.target;
        setValues({...values, [name]:value});
    };

    const handleDateChange = (selectedDate) => {setValues({...values, date: selectedDate})}
    const handleStartHour = (selectedHour) => {setValues({...values, startHour: selectedHour})}
    const handleEndHour = (selectedHour) => {setValues({...values, endHour: selectedHour})}
    const handleCheckbox = (event) => {setValues({...values, [event.target.name]: event.target.checked})}

    const handleSubmit = event => {
        event.preventDefault();
        alert(`הפגישה נוצרה בהצלחה.`);
        setValues(initialValues)
    };

    let FrontalOrVirtual;
    if (values.isVirtual === 'frontal') {
        FrontalOrVirtual = (
            <TextField required label={"מיקום"} variant={"outlined"} name={"place"}
                       value={values.place} onChange={handleChange}/>
        );
    }
    else {
        FrontalOrVirtual = (
            <>
                <Styles.Text>לחצ/י על <a href="https://meet.google.com/new" target="_blank" rel="noreferrer">קישור זה</a> על מנת ליצור שיחת וידאו עתידית.
                    לאחר מכן העתק/י את קישור הפגישה לשדה המופיע מטה.</Styles.Text>
                <TextField required label={"קישור"} placeholder={"העתק/י לכאן..."} variant={"outlined"}
                           InputLabelProps={{ shrink: true }}  name={"link"}
                           value={values.link} onChange={handleChange}/>
                <Styles.Warning>שימ/י לב! קישור זה מחייב שימוש בחשבון ה-Gmail
                    המחובר כעת במהלך הפגישה ויקנה לך הרשאות מנהל/ת במהלכה.</Styles.Warning>
            </>
        );
    }

    return (
        <Paper className={classes.page}>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Styles.Title>יצירת קבוצה</Styles.Title>
                <Grid container>
                    <Grid item xs={12} sm={8}>
                        <Styles.Label>נושא</Styles.Label>
                        <TextField required variant={"outlined"} name={"groupTitle"}
                                   value={values.groupTitle} onChange={handleChange}/>
                        <Styles.Label>תיאור הקבוצה</Styles.Label>
                        <TextField required variant={"outlined"} multiline rows={9} name={"groupDescription"}
                                   value={values.groupDescription} onChange={handleChange}/>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Grid container>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        required autoOk disablePast disableToolbar
                                        variant={"inline"} label={"בחר/י תאריך"}
                                        format={"dd/MM/yyyy"} name={"date"}  value={values.date}
                                        onChange={selectedDate => handleDateChange(selectedDate)}/>
                                </MuiPickersUtilsProvider>
                                <TextField required type="number" name="groupSize" label={"מס' המשתתפים/ות"}
                                           InputProps={{inputProps: { min: 2, max: 100 }}}
                                           value={values.groupSize} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        required autoOk ampm={false} variant={"inline"} label={"שעת התחלה"}
                                        minutesStep={5} value={values.startHour} onChange={handleStartHour}
                                        keyboardIcon={<ClockIcon/>}/>
                                    <KeyboardTimePicker
                                        required autoOk ampm={false} variant={"inline"} label={"שעת סיום"}
                                        minutesStep={5} value={values.endHour} onChange={handleEndHour}
                                        keyboardIcon={<ClockIcon/>}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset" style={{margin: "30px 5px 0"}}>
                                    <FormLabel component="legend">סוג הפגישה</FormLabel>
                                    <RadioGroup name={"isVirtual"} value={values.isVirtual}
                                                row onChange={handleChange}>
                                        <FormControlLabel value={"frontal"} control={<Radio/>} label={"פרונטלית"} />
                                        <FormControlLabel value={"virtual"} control={<Radio/>} label={"וירטואלית"} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {FrontalOrVirtual}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup style={{margin: "10px 0 0 0"}}>
                            <FormControlLabel
                                control={<Checkbox checked={values.institution}
                                                   onChange={handleCheckbox} name={"institution"} />}
                                label={"ברצוני שרק סטודנטים/יות מהמוסד האקדמי שלי יוכלו להצטרף לקבוצה."}/>
                            <FormControlLabel
                                control={<Checkbox checked={values.calendar}
                                                   onChange={handleCheckbox} name={"calendar"} />}
                                label={"אנא הוסיפו עבורי אירוע ביומן עם פרטי הפגישה."}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <ButtonGroup style={{margin: "10px 0 0 0"}}>
                    <Button style={{margin: "0 0 0 5px"}}
                            variant={"contained"} color={"secondary"} size={"large"} href={"/"}
                            className={classes.button} startIcon={<DeleteIcon />}>ביטול</Button>
                    <Button variant={"contained"} color={"primary"} size={"large"} type={"submit"}
                            className={classes.button} startIcon={<SaveIcon />}>אישור</Button>
                </ButtonGroup>
            </form>
        </Paper>
    )
}

export default CreateGroup;