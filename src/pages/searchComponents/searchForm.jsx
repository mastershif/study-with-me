import {useState} from "react";
import {Button, ButtonGroup, Checkbox, Collapse,
    FormControl, FormControlLabel, FormGroup, FormLabel,
    Grid, Radio, RadioGroup, TextField, Typography
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import * as Styles from "../../styles/searchStyle";
import TimeRangeSlider from 'react-time-range-slider';
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from '@material-ui/icons/FilterList';
import {sortedCitiesNames} from "../../assets/cities";
import Fuse from "fuse.js";
import clsx from "clsx";
import MultiSelect from "./multiSelect";
import {format, parseISO} from "date-fns";
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

    const {allGroups, setResults, setShowResults} = props;
    const [searchParameters, setSearchParameters] = useState(initialSearchParameters);
    const [isOpen, setIsOpen] = useState(false);
    const classes = Styles.useStyles();

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

    const options = {
        threshold: 0.0,
        ignoreLocation: true,
        keys: ["groupTitle", "groupDescription"]
    }

    const searchAlgorithm = (group) => {
        return (
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
                getHourFormat(group.item.endHour, true))
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
                <Grid container className={clsx(classes.whiteBackground, classes.formControl)}>
                    <Grid item xs={12} sm={4} style={{marginLeft: '20px'}}>
                        <FormControl fullWidth>
                            <FormLabel component="legend">מילות חיפוש</FormLabel>
                            <TextField variant={"outlined"} name={"text"} type={"search"} margin={"dense"}
                                       value={searchParameters.text} onChange={handleChange}/>
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
                        <Button onClick={handleOpen} startIcon={<FilterListIcon/>}
                                size={"large"} style={{marginTop: '15px', border: '1.5px solid grey'}}>
                            סינונים נוספים
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
                <ButtonGroup style={{margin: "10px 0 0 0", paddingRight: "1rem"}}>
                    <Button variant={"contained"} color={"primary"} size={"large"} type={"submit"}
                            startIcon={<SearchIcon />}>חיפוש</Button>
                </ButtonGroup>
            </Grid>
        </form>
    )
}

export default SearchForm;
