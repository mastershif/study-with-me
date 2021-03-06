import {useState} from "react";
import {Button, Checkbox, Collapse,
    FormControl, FormControlLabel, FormGroup, FormLabel,
    Grid, Radio, RadioGroup, TextField, Typography
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import * as Styles from "../../styles/searchStyle";
import TimeRangeSlider from 'react-time-range-slider';
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from '@material-ui/icons/FilterList';
import ResetIcon from '@material-ui/icons/Replay';
import {sortedCitiesNames} from "../../assets/cities";
import Fuse from "fuse.js";
import clsx from "clsx";
import MultiSelect from "./multiSelect";
import {format, parseISO, isAfter} from "date-fns";
import he from "date-fns/locale/he";


const initialSearchParameters = {
    text: '',
    groupSize: '',
    groupPurpose: ['למידה למבחן', 'חזרה על החומר', 'להתרכז ביחד', 'אחר'],
    hours: {
        start: '00:00',
        end: '23:59'
    },
    meetingType: 'הכל',
    institution: false,
    city: ''
}

const getHourFormat = (hour, isFullDate) => {
    if (isFullDate) {
        hour = format(parseISO(hour), "HH:mm", {locale: he});
    }
    return Date.parse('01/01/2021 ' + hour);
}

const SearchForm = (props) => {

    const {allGroups, getAllGroups, setResults, setShowResults,
        setTotalPages, itemsPerPage, setCurrentPage, user} = props;
    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);
    const [isOpen, setIsOpen] = useState(false);
    const classes = Styles.useStyles();
    let autocompleteOptions = [];

    if (allGroups) {
        autocompleteOptions = allGroups.map(obj => obj.groupTitle);
    }

    const handleAutocomplete = (event, value) => {setSearchParameters({...searchParameters, text: value === null ? '' : value})}
    const handleChange = (event) => {
        const {name, value} = event.target;
        setSearchParameters({...searchParameters, [name]:value});
    };
    const handleChangeHours = (selected) => {setSearchParameters({...searchParameters, hours: selected})}
    const handleCheckbox = (event) => {setSearchParameters({...searchParameters, [event.target.name]: event.target.checked})}
    const handleCity = (event, value) => {
        setSearchParameters({...searchParameters, city: value === null ? '' : value})
    }
    const handleMultiSelect = (event) => {
        setSearchParameters({...searchParameters, groupPurpose: event.target.value });
    };
    const handleOpen = () => {setIsOpen(!isOpen)}
    const handleReset = () => {setSearchParameters(initialSearchParameters)}

    const options = {
        threshold: 0.0,
        ignoreLocation: true,
        useExtendedSearch: true,
        keys: ["groupTitle", "groupDescription"]
    }

    const searchAlgorithm = (group) => {
        return (
            (group.item?.deleted !== true) &&
            (isAfter(new Date(format(parseISO(group.item.date),
                "MM/dd/yyyy 23:59", {locale: he})), new Date())) &&
            (searchParameters.meetingType === 'הכל' ?
                true : group.item.meetingType === searchParameters.meetingType) &&
            (searchParameters.groupSize === '' ?
                true : group.item.groupSize <= searchParameters.groupSize) &&
            (searchParameters.city === '' ?
                true : group.item.city === searchParameters.city) &&
            (searchParameters.groupPurpose.includes(group.item.groupPurpose)) &&
            (getHourFormat(searchParameters.hours.start, false) <=
                getHourFormat(group.item.startHour, true) &&
                getHourFormat(searchParameters.hours.end, false) >=
                getHourFormat(group.item.endHour, true)) &&
            (searchParameters.institution ?
                (group.item.institution === user?.institute) :
                (group.item.institution === 'הכל' || group.item.institution === user?.institute))
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
        getAllGroups();
        if (allGroups) {
            const fuse = new Fuse(allGroups, options);
            let results = (
                searchParameters.text === "" ? emptyStringSearch : fuse.search(searchParameters.text)
            )
            results = results.filter(searchAlgorithm);
            setResults(results);
            setTotalPages(Math.ceil(results.length / itemsPerPage));
            setCurrentPage(1);
            autocompleteOptions = allGroups.map(obj => obj.groupTitle);
        }
        setShowResults(true);
    };

    return (
        <form>
            <Styles.Title>חיפוש קבוצה</Styles.Title>
            <Grid container>
                <Grid container className={clsx(classes.whiteBackground, classes.formControl)}>
                    <Grid item xs={12} sm={4} style={{marginLeft: '20px'}}>
                        <FormControl fullWidth>
                            <FormLabel component="legend">מילות חיפוש</FormLabel>
                            <Autocomplete variant={"outlined"} name={"text"} freeSolo includeInputInList
                                          options={autocompleteOptions} popupIcon={null}
                                          inputValue={searchParameters.text} onInputChange={handleAutocomplete}
                                          renderInput={(params) =>
                                              <TextField {...params} margin={"dense"} autoFocus
                                                         variant={"outlined"} />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend" style={{margin: "0 0 7px"}}>
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
                    <Grid item xs={12} sm={3} style={{marginLeft: '20px'}}>
                        <FormControl fullWidth>
                            <FormLabel style={{margin: "0 0 7px"}}>מטרת הפגישה</FormLabel>
                            <MultiSelect groupPurpose={searchParameters.groupPurpose}
                                         handleMultiSelect={handleMultiSelect}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} style={{margin: '5px 0 15px 0'}}>
                        <Button className={classes.filtersButton} onClick={handleOpen}
                                startIcon={<FilterListIcon/>} size={"large"}>
                            סינונים נוספים
                        </Button>
                        <Button className={classes.resetButton} onClick={handleReset}
                                startIcon={<ResetIcon/>} size={"large"}>
                            איפוס
                        </Button>
                    </Grid>
                    <Collapse in={isOpen}>
                        <Grid container>
                            <Grid item xs={9} sm={3} style={{marginLeft: '25px'}}>
                                <FormLabel component="legend" style={{margin: "0 0 15px 0"}}>
                                    טווח שעות
                                </FormLabel>
                                <Styles.RangeSliderContainer style={{direction: "ltr"}}>
                                    <TimeRangeSlider
                                        disabled={false} format={24}
                                        maxValue={"23:59"} minValue={"00:00"} name={"hours"}
                                        onChange={handleChangeHours}
                                        step={15} value={searchParameters.hours}
                                    />
                                </Styles.RangeSliderContainer>
                                <Typography variant="body1" component="p" style={{textAlign: "center"}}>
                                    {searchParameters.hours.end} - {searchParameters.hours.start}
                                </Typography>
                            </Grid>
                            <Grid item xs={9} sm={3} style={{marginLeft: '25px'}}>
                                <FormLabel component="legend">עיר</FormLabel>
                                <Autocomplete options={sortedCitiesNames} value={searchParameters.city}
                                              name={"city"} onChange={handleCity} fullWidth
                                              noOptionsText={"אין תוצאה מתאימה"}
                                              getOptionSelected={(option,value) => value.value === option.value}
                                              renderInput={(params) =>
                                                  <TextField {...params}
                                                             variant={"outlined"} margin={"dense"} />}
                                />
                            </Grid>
                            <Grid item xs={9} sm={4} md={3}>
                                <FormControl fullWidth>
                                    <FormLabel component="legend">מס' משתתפים/ות מקסימלי</FormLabel>
                                    <TextField type="number" name="groupSize"
                                               variant={"outlined"} margin={"dense"}
                                               value={searchParameters.groupSize} onChange={handleChange}/>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} style={{paddingTop: "0px", paddingBottom: "0px"}}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<Checkbox checked={searchParameters.institution}
                                                           onChange={handleCheckbox} name={"institution"} />}
                                        label={"אני רוצה ללמוד רק עם סטודנטים/יות מהמוסד האקדמי שלי."}/>
                                </FormGroup>
                            </Grid>
                        </Grid>
                    </Collapse>
                </Grid>
                <Button variant={"contained"} color={"primary"} size={"large"}
                        style={{margin: "10px 25px 0 0"}} onClick={handleSubmit}
                        type={"submit"} id={"searchButton"} startIcon={<SearchIcon />}>
                    חיפוש
                </Button>
            </Grid>
        </form>
    )
}

export default SearchForm;
