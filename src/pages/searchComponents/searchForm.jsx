import * as Styles from '../../styles/createGroupStyle';
import {
    Button, ButtonGroup,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid, InputLabel, makeStyles,
    Radio,
    RadioGroup, Select,
    TextField
} from "@material-ui/core";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ClockIcon from "@material-ui/icons/AccessTime";
import {useState} from "react";
import SearchIcon from "@material-ui/icons/Search";
import {citiesNames} from "./cities";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const initialSearchParameters = {
    groupTitle: '',
    groupSize: null,
    date: null,
    startHour: null,
    endHour: null,
    isVirtual: 'virtual',
    place: '',
    link: '',
    institution: false,
    calendar: false,
    city: ''
}

const SearchForm = ({ setShowResults }) => {
    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);

    const classes = useStyles();

    const handleDateChange = (selectedDate) => {setSearchParameters({...searchParameters, date: selectedDate})}
    const handleStartHour = (selectedHour) => {setSearchParameters({...searchParameters, startHour: selectedHour})}
    const handleEndHour = (selectedHour) => {setSearchParameters({...searchParameters, endHour: selectedHour})}
    const handleCheckbox = (event) => {setSearchParameters({...searchParameters, [event.target.name]: event.target.checked})}
    const handleCity = (event) => {setSearchParameters({...searchParameters, [event.target.name]: event.target.value})}

    const handleChange = event => {
        const {name, value} = event.target;
        setSearchParameters({...searchParameters, [name]:value});
    };

    const handleSubmit = event => {
        event.preventDefault();
        console.log('you are searching for a study group');
        setShowResults(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Styles.Title>חיפוש קבוצה</Styles.Title>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <FormGroup style={{margin: "10px 0 0 0"}}>
                        <Styles.Label style={{margin: "0 0 8px 0"}}>מילות חיפוש</Styles.Label>
                        <TextField required={false} variant={"outlined"} name={"groupTitle"}
                                   value={searchParameters.groupTitle} onChange={handleChange}/>
                    </FormGroup>
                </Grid>
                <Grid container style={{margin: "16px 0 0 0"}}>
                <Grid item xs={12} sm={6}>
                    <Grid container>
                        <Grid item xs={12}  sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    required={false} autoOk disablePast disableToolbar
                                    variant={"inline"} label={"בחר/י תאריך"}
                                    format={"dd/MM/yyyy"} name={"date"}  value={searchParameters.date}
                                    onChange={selectedDate => handleDateChange(selectedDate)}/>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}   sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    required={false} autoOk ampm={false} variant={"inline"} label={"טווח שעות - התחלה"}
                                    minutesStep={5} value={searchParameters.startHour} onChange={handleStartHour}
                                    keyboardIcon={<ClockIcon/>}/>
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12}   sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    required={false} autoOk ampm={false} variant={"inline"} label={"טווח שעות - סיום"}
                                    minutesStep={5} value={searchParameters.endHour} onChange={handleEndHour}
                                    keyboardIcon={<ClockIcon/>}/>
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={6}>
                        <FormGroup style={{margin: "10px 0 0 0"}}>
                            <FormControl component="fieldset" style={{margin: "30px 5px 0"}}>
                                <FormLabel component="legend">סוג הקבוצה</FormLabel>
                                <RadioGroup name={"isVirtual"} value={searchParameters.isVirtual}
                                            row onChange={handleChange}>
                                    <FormControlLabel value={"virtual"} control={<Radio/>} label={"וירטואלית"} />
                                    <FormControlLabel value={"frontal"} control={<Radio/>} label={"פרונטלית"} />
                                </RadioGroup>
                            </FormControl>
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid container>
                <Grid item xs={12}  sm={2}>
                    <FormGroup style={{margin: "10px 0 0 0"}}>
                        <TextField required={false} type="number" name="groupSize" label={"מס' משתתפים/ות מקסימלי"}
                                   InputProps={{inputProps: { min: 2, max: 100 }}}
                                   value={searchParameters.groupSize} onChange={handleChange}/>
                    </FormGroup>
                </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormGroup style={{margin: "10px 0 0 0"}}>
                        <FormControlLabel
                            control={<Checkbox checked={searchParameters.institution}
                                               onChange={handleCheckbox} name={"institution"} />}
                            label={"אני רוצה ללמוד רק עם סטודנטים/יות מהמוסד האקדמי שלי"}/>
                    </FormGroup>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="city-native-simple">עיר</InputLabel>
                        <Select
                            native
                            value={searchParameters.city}
                            onChange={handleCity}
                            inputProps={{
                                name: 'city',
                                id: 'city-native-simple',
                            }}
                        >
                            <option aria-label="None" value="" />
                            {citiesNames.map(city => <option value={city}>{city}</option>)}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <ButtonGroup style={{margin: "10px 0 0 0"}}>
                <Button variant={"contained"} color={"primary"} size={"large"} type={"submit"}
                         startIcon={<SearchIcon />}>חיפוש</Button>
            </ButtonGroup>
        </form>
    )
}

export default SearchForm;
