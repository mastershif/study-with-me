import {useState} from "react";
import * as Styles from "../styles/createGroupStyle"
import {
    Grid, TextField, Checkbox, Button, RadioGroup, Radio,
    FormControlLabel, FormControl, FormLabel, FormGroup, ButtonGroup, Select, MenuItem, Divider
} from "@material-ui/core";
import ClockIcon from "@material-ui/icons/AccessTime";
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import {MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import he from "date-fns/locale/he";
import {Autocomplete} from "@material-ui/lab";
import {sortedCitiesNames} from "./searchComponents/cities";

//This is the create-group page, including the form with all the necessary fields.

const initialValues = {
    groupTitle: '',
    groupDescription: '',
    groupPurpose: '',
    groupSize: '',
    date: null,
    startHour: null,
    endHour: null,
    meetingType: 'פרונטלית',
    city: '',
    place: '',
    link: '',
    institution: false,
    calendar: false
}

const CreateGroup = () => {

    const [values, setValues] = useState(initialValues);
    const classes = Styles.useStyles();

    const handleChange = event => {
        const {name, value} = event.target;
        setValues({...values, [name]:value});
    };
    const handleDateChange = (selectedDate) => {setValues({...values, date: selectedDate})}
    const handleStartHour = (hour) => {setValues({...values, startHour: hour})}
    const handleEndHour = (hour) => {setValues({...values, endHour: hour})}
    const handleCheckbox = (event) => {setValues({...values, [event.target.name]: event.target.checked})}
    const handleCity = (event, value) => {setValues({...values, city: value})}


    const handleSubmit = event => {
        event.preventDefault();
        alert(`הפגישה נוצרה בהצלחה.`);
        setValues(initialValues)
    };

    //A variable for rendering the frontal or virtual meeting form (address or meeting URL).

    let FrontalOrVirtual;
    if (values.meetingType === 'פרונטלית') {
        FrontalOrVirtual = (
            <>
                <Autocomplete options={sortedCitiesNames} value={values.city} name={"city"}
                              onChange={handleCity} getOptionLabel={(option) => option}
                    renderInput={(params) =>
                        <TextField {...params} label={"עיר"} required
                                   InputLabelProps={{ shrink: true }} variant={"standard"} />}
                />
                <TextField required InputLabelProps={{ shrink: true }}
                           label={"מיקום מדויק"} variant={"standard"} name={"place"}
                           placeholder={"לדוגמה: הספרייה המרכזית באוניברסיטת תל-אביב"}
                           value={values.place} onChange={handleChange}/>
                <Styles.Warning>
                    נא להזין כתובות <u>ציבוריות</u> בלבד! מיקום הפגישה עשוי להיות גלוי לכל גולשי האתר.
                </Styles.Warning>
            </>
        );
    }
    else {
        FrontalOrVirtual = (
            <>
                <Styles.Text>
                    לחצ/י על <a href="https://meet.google.com/new" target="_blank" rel="noreferrer">קישור זה</a> על מנת ליצור שיחת וידאו עתידית.
                    לאחר מכן העתק/י את קישור הפגישה לשדה המופיע מטה.
                </Styles.Text>
                <TextField required type={"url"} label={"קישור"} placeholder={"העתק/י לכאן..."}
                           variant={"outlined"} InputLabelProps={{ shrink: true }}  name={"link"}
                           value={values.link} onChange={handleChange}/>
                <Styles.Warning>
                    שימ/י לב! קישור זה מחייב שימוש בחשבון ה-Gmail המחובר כעת במהלך הפגישה ויקנה לך הרשאות מנהל/ת במהלכה.
                </Styles.Warning>
            </>
        );
    }

    return (
        <div className={classes.page}>
            <form className={classes.root} onSubmit={handleSubmit}>
                <Styles.Title>יצירת קבוצה</Styles.Title>
                <Grid container>
                    <Grid item xs={12} md={8}>
                        <Grid container>
                            <Grid item xs={12} md={8}>
                                <Styles.Label>נושא</Styles.Label>
                                <TextField autoFocus required variant={"outlined"} name={"groupTitle"}
                                           inputProps={{maxLength: 40}}
                                           value={values.groupTitle} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <FormControl className={classes.select}>
                                    <Styles.Label>מטרה</Styles.Label>
                                    <Select required name={"groupPurpose"} variant={"outlined"}
                                            value={values.groupPurpose} onChange={handleChange}>
                                        <MenuItem value={"למידה למבחן"}>למידה למבחן</MenuItem>
                                        <MenuItem value={"חזרה על החומר"}>חזרה על החומר</MenuItem>
                                        <MenuItem value={"להתרכז ביחד"}>להתרכז ביחד</MenuItem>
                                        <MenuItem value={"אחר"}>אחר</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <Styles.Label>תיאור הקבוצה</Styles.Label>
                                <TextField variant={"outlined"} multiline rows={9} name={"groupDescription"}
                                           inputProps={{maxLength: 500}}
                                           value={values.groupDescription} onChange={handleChange}/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Grid container>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
                                    <KeyboardDatePicker
                                        required autoOk disablePast
                                        variant={"inline"} label={"בחר/י תאריך"}
                                        InputProps={{inputProps: {dir: "ltr"}}}
                                        invalidDateMessage={"נא להזין תאריך חוקי."}
                                        minDateMessage={"נא להזין תאריך חוקי."}
                                        maxDateMessage={"נא להזין תאריך חוקי."}
                                        format={"dd/MM/yyyy"} name={"date"}  value={values.date}
                                        onChange={selectedDate => handleDateChange(selectedDate)}/>
                                </MuiPickersUtilsProvider>
                                <TextField required type="number" name="groupSize" label={"מס' המשתתפים/ות"}
                                           InputProps={{inputProps: {min: 2, max: 100, values: /\d/}}}
                                           value={values.groupSize} onChange={handleChange}/>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardTimePicker
                                        required autoOk ampm={false} variant={"inline"} label={"שעת התחלה"}
                                        InputProps={{inputProps: {dir: "ltr"}}}
                                        invalidDateMessage={"נא להזין שעה חוקית."}
                                        minDateMessage={"נא להזין שעה חוקית."}
                                        maxDateMessage={"נא להזין שעה חוקית."}
                                        minutesStep={5} value={values.startHour} onChange={handleStartHour}
                                        keyboardIcon={<ClockIcon/>}/>
                                    <KeyboardTimePicker
                                        required autoOk ampm={false} variant={"inline"} label={"שעת סיום"}
                                        InputProps={{inputProps: {dir: "ltr"}}}
                                        invalidDateMessage={"נא להזין שעה חוקית."}
                                        minDateMessage={"נא להזין שעה חוקית."}
                                        maxDateMessage={"נא להזין שעה חוקית."}
                                        minutesStep={5} value={values.endHour} onChange={handleEndHour}
                                        keyboardIcon={<ClockIcon/>}/>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl component="fieldset" style={{margin: "30px 5px 0"}}>
                                    <FormLabel component="legend">סוג הפגישה</FormLabel>
                                    <RadioGroup name={"meetingType"} value={values.meetingType}
                                                row onChange={handleChange}>
                                        <FormControlLabel value={"פרונטלית"} control={<Radio/>} label={"פרונטלית"} />
                                        <FormControlLabel value={"וירטואלית"} control={<Radio/>} label={"וירטואלית"} />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                {FrontalOrVirtual}
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup className={classes.checkboxGroup}>
                            <FormControlLabel className={classes.checkbox}
                                control={<Checkbox name={"institution"}
                                                   checked={values.institution} onChange={handleCheckbox}  />}
                                label={"ברצוני שרק סטודנטים/יות מהמוסד האקדמי שלי יוכלו להצטרף לקבוצה."}
                            />
                            <Divider />
                            <FormControlLabel className={classes.checkbox}
                                control={<Checkbox name={"calendar"}
                                                   checked={values.calendar} onChange={handleCheckbox} />}
                                label={"אנא הוסיפו עבורי אירוע ביומן עם פרטי הפגישה."}
                            />
                        </FormGroup>
                    </Grid>
                </Grid>
                <ButtonGroup className={classes.buttonGroup}>
                    <Button style={{margin: "0 0 0 5px"}}
                            variant={"contained"} color={"secondary"} size={"large"} href={"/"}
                            className={classes.button} startIcon={<DeleteIcon />}>ביטול</Button>
                    <Button variant={"contained"} color={"primary"} size={"large"} type={"submit"}
                            className={classes.button} startIcon={<SaveIcon />}>אישור</Button>
                </ButtonGroup>
            </form>
        </div>
    )
}

export default CreateGroup;