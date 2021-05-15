import {useState} from "react";
import {Button, ButtonGroup, Checkbox, FormControl, FormControlLabel,
    FormGroup, FormLabel, Grid, Radio, RadioGroup, TextField} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import * as Styles from "../../styles/searchStyle";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ClockIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import {sortedCitiesNames} from "../../assets/cities";
import Fuse from "fuse.js";
import clsx from "clsx";


const initialSearchParameters = {
    text: '',
    groupSize: '',
    date: null,
    startHour: null,
    endHour: null,
    meetingType: 'הכל',
    institution: false,
    city: ''
}

const SearchForm = (props) => {

    const {allGroups, setResults, setShowResults} = props;
    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);
    const classes = Styles.useStyles();

    console.log(searchParameters.groupSize);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setSearchParameters({...searchParameters, [name]:value});
    };
    const handleDateChange = (selectedDate) => {setSearchParameters({...searchParameters, date: selectedDate})}
    const handleStartHour = (selectedHour) => {setSearchParameters({...searchParameters, startHour: selectedHour})}
    const handleEndHour = (selectedHour) => {setSearchParameters({...searchParameters, endHour: selectedHour})}
    const handleCheckbox = (event) => {setSearchParameters({...searchParameters, [event.target.name]: event.target.checked})}
    const handleCity = (event, value) => {
        setSearchParameters({...searchParameters, city: value === null ? '' : value})
    }

    const options = {
        threshold: 0.0,
        ignoreLocation: true,
        minMatchCharLength: true,
        keys: ["groupTitle", "groupDescription"]
    }

    const searchAlgorithm = (group) => {
        return (
            (searchParameters.meetingType === 'הכל' ?
                true : group.item.meetingType === searchParameters.meetingType) &&
            (searchParameters.groupSize === ''
                ? true : group.item.groupSize <= searchParameters.groupSize)

        )
    }

    let emptyStringSearch = {};
    if (allGroups) {
        emptyStringSearch = allGroups.map(group => ({
            item: Object.assign(group, {}),
            matches: [],
            score: 1
        }))
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (allGroups) {
            const fuse = new Fuse(allGroups, options)
            let results = (
                searchParameters.text === "" ? emptyStringSearch : fuse.search(searchParameters.text)
            )
            results = results.filter(searchAlgorithm)
            setResults(results);
        }
        setShowResults(true);
    };



    return (
        <form onSubmit={handleSubmit}>
            <Styles.Title>חיפוש קבוצה</Styles.Title>
            <Grid container>
                <Grid container spacing={5} className={clsx(classes.whiteBackground, classes.formControl)}>
                    <Grid item xs={12} sm={4}>
                        <FormControl fullWidth>
                            <FormLabel component="legend">מילות חיפוש</FormLabel>
                            <TextField variant={"outlined"} name={"text"} type={"search"} margin={"dense"}
                                       value={searchParameters.text} onChange={handleChange}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{margin: "0 0 5px"}}>
                                סוג הקבוצה
                            </FormLabel>
                            <RadioGroup name={"meetingType"} value={searchParameters.meetingType}
                                        row onChange={handleChange}>
                                <FormControlLabel value={"הכל"} control={<Radio/>} label={"הכל"} />
                                <FormControlLabel value={"וירטואלית"} control={<Radio/>} label={"וירטואלית"} />
                                <FormControlLabel value={"פרונטלית"} control={<Radio/>} label={"פרונטלית"} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} className={classes.noBackground}>
                    <Styles.MiniTitle>סינונים נוספים:</Styles.MiniTitle>
                    <Grid container style={{margin: "10px 0 0 0"}}>
                        <Grid item xs={12} sm={12} md={10} lg={6}>
                            <Grid container>
                                <Grid item xs={12} sm={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk disablePast disableToolbar
                                            variant={"inline"} label={"בחר/י תאריך"}
                                            format={"dd/MM/yyyy"} name={"date"}  value={searchParameters.date}
                                            onChange={selectedDate => handleDateChange(selectedDate)}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            autoOk ampm={false} variant={"inline"} label={"טווח שעות - התחלה"}
                                            minutesStep={5} value={searchParameters.startHour} onChange={handleStartHour}
                                            keyboardIcon={<ClockIcon/>}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardTimePicker
                                            autoOk ampm={false} variant={"inline"} label={"טווח שעות - סיום"}
                                            minutesStep={5} value={searchParameters.endHour} onChange={handleEndHour}
                                            keyboardIcon={<ClockIcon/>}/>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={8} sm={4} md={3} lg={2}>
                            <FormGroup style={{margin: "10px 0 0 0"}}>
                                <TextField type="number" name="groupSize" label={"מס' משתתפים/ות מקסימלי"}
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
                        <Autocomplete options={sortedCitiesNames} value={searchParameters.city}
                                      name={"city"} onChange={handleCity} fullWidth
                                      getOptionSelected={(option,value) => value.value === option.value}
                                      renderInput={(params) =>
                                          <TextField {...params} label={"עיר"} variant={"standard"} />}
                        />
                    </Grid>
                </Grid>
                <ButtonGroup style={{margin: "10px 0 0 0", paddingRight: "1rem"}}>
                    <Button variant={"contained"} color={"primary"} size={"large"} type={"submit"}
                            startIcon={<SearchIcon />}>חיפוש</Button>
                </ButtonGroup>
            </Grid>
        </form>
    )
}

export default SearchForm;
