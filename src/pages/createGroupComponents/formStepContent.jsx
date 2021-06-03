import {
    Checkbox, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, InputAdornment,
    MenuItem, OutlinedInput, Radio, RadioGroup, Select, TextField
} from "@material-ui/core";
import * as Styles from "../../styles/createGroupStyle";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import he from "date-fns/locale/he";
import ClockIcon from "@material-ui/icons/AccessTime";
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import {Autocomplete} from "@material-ui/lab";
import {sortedCitiesNames} from "../../assets/cities";


const FormStepContent = (props) => {

    const {activeStep, values, setValues, errors, setIsGroupTitleOutOfFocus} = props;

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues({...values, [name]:value});
    };
    const handleDateChange = (selectedDate) => {setValues({...values, date: selectedDate})}
    const handleStartHour = (hour) => {setValues({...values, startHour: hour})}
    const handleEndHour = (hour) => {setValues({...values, endHour: hour})}
    const handleCheckbox = (event) => {setValues({...values, [event.target.name]: event.target.checked})}
    const handleCity = (event, value) => {setValues({...values, city: value === null ? '' : value})}

    const getErrorMessage = (name) => {
        return (
            errors.inner?.find(
            (ve) => ve.path === name)?.message
        )
    }

    return (
        <div>
            { activeStep === 0 ? (
                <div>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={7}>
                            <FormControl required fullWidth>
                                <FormLabel component="legend">נושא</FormLabel>
                                <OutlinedInput required autoFocus name={"groupTitle"} style={{marginTop: 5}}
                                               inputProps={{maxLength: 40}} margin={"dense"}
                                               value={values.groupTitle} onChange={handleChange}
                                               onBlur={() => setIsGroupTitleOutOfFocus(true)}/>
                            </FormControl>
                            <FormHelperText error>
                                {getErrorMessage('groupTitle')}
                            </FormHelperText>
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <FormControl fullWidth>
                                <FormLabel required component="legend">מטרה</FormLabel>
                                <Select required name={"groupPurpose"} variant={"outlined"}
                                        style={{marginTop: 5}} margin={"dense"}
                                        value={values.groupPurpose} onChange={handleChange}>
                                    <MenuItem value={"למידה למבחן"}>למידה למבחן</MenuItem>
                                    <MenuItem value={"חזרה על החומר"}>חזרה על החומר</MenuItem>
                                    <MenuItem value={"להתרכז ביחד"}>להתרכז ביחד</MenuItem>
                                    <MenuItem value={"אחר"}>אחר</MenuItem>
                                </Select>
                            </FormControl>
                            <FormHelperText error>
                                {getErrorMessage('groupPurpose')}
                            </FormHelperText>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <FormControl fullWidth style={{marginTop: 20}}>
                                <FormLabel component="legend">תיאור הקבוצה</FormLabel>
                                <OutlinedInput multiline rows={4} margin={"dense"}
                                               style={{marginTop: 5}} name={"groupDescription"}
                                               inputProps={{maxLength: 500}}
                                               value={values.groupDescription} onChange={handleChange}/>
                            </FormControl>
                            <FormControlLabel style={{marginTop: 10}}
                                              control={
                                                  <Checkbox name={"institution"} checked={values.institution}
                                                            onChange={handleCheckbox} />}
                                              label={"ברצוני שרק סטודנטים/יות מהמוסד האקדמי שלי יוכלו להצטרף לקבוצה."}
                            />
                        </Grid>
                    </Grid>
                </div>
            ) : activeStep === 1 ? (
                <div>
                    <Grid container justify={"center"} spacing={1}>
                        <Grid item xs={6} lg={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={he}>
                                <KeyboardDatePicker required autoOk disablePast fullWidth
                                    variant={"inline"} label={"בחר/י תאריך"}
                                    InputProps={{inputProps: {dir: "ltr"}}}
                                    invalidDateMessage={""} minDateMessage={""} maxDateMessage={""}
                                    format={"dd/MM/yyyy"} name={"date"} value={values.date}
                                    onChange={selectedDate => handleDateChange(selectedDate)}
                                />
                                <FormHelperText error>
                                    {getErrorMessage('date')}
                                </FormHelperText>
                            </MuiPickersUtilsProvider>
                            <div>
                                <TextField required fullWidth
                                           type="number" name="groupSize" label={"מס' המשתתפים/ות"}
                                           style={{marginTop: 5}} value={values.groupSize} onChange={handleChange}
                                           InputProps={{
                                               endAdornment: (
                                                   <InputAdornment style={{marginLeft: 12}} position="end">
                                                       <GroupOutlinedIcon color={"action"} />
                                                   </InputAdornment>
                                               )}}
                                           />
                                <FormHelperText error>
                                    {getErrorMessage('groupSize')}
                                </FormHelperText>
                            </div>
                        </Grid>
                        <Grid item xs={6} lg={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    required autoOk ampm={false} name={"startHour"}
                                    variant={"inline"} label={"שעת התחלה"}
                                    InputProps={{inputProps: {dir: "ltr"}}}
                                    invalidDateMessage={""} minDateMessage={""} maxDateMessage={""}
                                    minutesStep={5} value={values.startHour} onChange={handleStartHour}
                                    keyboardIcon={<ClockIcon/>}/>
                                <FormHelperText error>
                                    {getErrorMessage('startHour')}
                                </FormHelperText>
                                <KeyboardTimePicker
                                    required autoOk ampm={false} name={"endHour"}
                                    variant={"inline"} label={"שעת סיום"} style={{marginTop: 5}}
                                    InputProps={{inputProps: {dir: "ltr"}}}
                                    invalidDateMessage={""} minDateMessage={""} maxDateMessage={""}
                                    minutesStep={5} value={values.endHour} onChange={handleEndHour}
                                    keyboardIcon={<ClockIcon/>}/>
                                <FormHelperText error>
                                    {getErrorMessage('endHour')}
                                </FormHelperText>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                        </Grid>
                    </Grid>
                </div>
            ) : activeStep === 2 ? (
                <Grid container>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">סוג הפגישה</FormLabel>
                            <RadioGroup name={"meetingType"} value={values.meetingType}
                                        row onChange={handleChange}>
                                <FormControlLabel value={"פרונטלית"} control={<Radio/>} label={"פרונטלית"} />
                                <FormControlLabel value={"וירטואלית"} control={<Radio/>} label={"וירטואלית"} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        {values.meetingType === 'פרונטלית' ? (
                            <div>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Autocomplete options={sortedCitiesNames} value={values.city} name={"city"}
                                                      onChange={handleCity} fullWidth
                                                      noOptionsText={"אין תוצאה מתאימה"}
                                                      getOptionSelected={(option,value) => value.value === option.value}
                                                      renderInput={(params) =>
                                                          <TextField {...params} label={"עיר"} required margin={"dense"}
                                                                      variant={"outlined"} />}
                                        />
                                        <FormHelperText error>
                                            {getErrorMessage('city')}
                                        </FormHelperText>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField required fullWidth margin={"dense"}
                                                   label={"מיקום מדויק"} variant={"outlined"} name={"place"}
                                                   value={values.place} onChange={handleChange}/>
                                        <FormHelperText error>
                                            {getErrorMessage('place')}
                                        </FormHelperText>
                                    </Grid>
                                </Grid>
                                <Styles.Warning>
                                    נא להזין כתובות <u>ציבוריות</u> בלבד! מיקום הפגישה עשוי להיות גלוי לכל גולשי האתר.
                                </Styles.Warning>
                            </div>
                        ) : (
                            <div>
                                <Styles.Text>
                                    לחצ/י על <a href="https://meet.google.com/new" target="_blank" rel="noreferrer">קישור זה</a> על מנת ליצור שיחת וידאו עתידית.
                                    לאחר מכן העתק/י את קישור הפגישה לשדה המופיע מטה.
                                </Styles.Text>
                                <TextField required type={"url"} name={"link"}
                                           label={"קישור"} placeholder={"העתק/י לכאן..."}
                                           fullWidth variant={"outlined"} value={values.link}
                                           InputLabelProps={{ shrink: true }} onChange={handleChange} />
                                <FormHelperText error>
                                    {getErrorMessage('link')}
                                </FormHelperText>
                                <Styles.Warning>
                                    שימ/י לב! קישור זה מחייב שימוש בחשבון ה-Gmail המחובר כעת במהלך הפגישה ויקנה לך הרשאות מנהל/ת במהלכה.
                                </Styles.Warning>
                            </div>
                        )}
                    </Grid>
                </Grid>
            ) : (
                <>
                </>
            )
            }
        </div>
    );
}

export default FormStepContent;
