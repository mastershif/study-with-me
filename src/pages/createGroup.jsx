import {useCallback, useEffect, useState} from "react";
import * as Styles from "../styles/createGroupStyle";
import {Button, ButtonGroup, Card, CardContent, GridList, withWidth,
    GridListTile, isWidthUp, Step, StepLabel, Stepper} from "@material-ui/core";
import FormStepContent from "./createGroupComponents/formStepContent";
import {formSchema} from "./createGroupComponents/formValidation";
import {useHistory} from "react-router-dom";
import {setUserFromDB} from "./signInComponents/setUserFromDB";
import GroupProfile from "./groupDialogComponents/groupProfile";
import {GroupsList} from "../styles/searchStyle";
import Fuse from "fuse.js";
import PaginationLine from "../sharedComponents/pagination";


let errors = {};
let lastTimeClicked = 0, currentTimeClicked;

let initialValues = {
    _id: '', groupTitle: '', groupDescription: '', groupPurpose: '', institution: false,
    groupSize: '', date: null, startHour: null, endHour: null,
    meetingType: 'פרונטלית', city: '', place: '', link: '', admin: undefined, communicationChannel: ''
};

const getSteps = () => {
    return ['נושא ותיאור', 'זמן וגודל', 'מיקום'];
}

const getSchema = (activeStep) => {
    return formSchema[activeStep];
}

const CreateGroup = (props) => {

    // If we are editing a group, the values should be the current group values.
    const {isEdit, group} = props;
    const [user, setUser] = useState();
    if (isEdit) {
        Object.assign(initialValues, group);
        initialValues.institution = group.institution !== 'הכל';
    }
    else {
        initialValues.admin = user?._id;
    }
    const [values, setValues] = useState(initialValues);
    const [activeStep, setActiveStep] = useState(0);
    const [isGroupTitleOutOfFocus, setIsGroupTitleOutOfFocus] = useState(false);
    const [allGroups, setAllGroups] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
    const [totalPages, setTotalPages] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    let pageSuggestions = [], columns = 1;
    let history = useHistory();
    const steps = getSteps();
    const classes = Styles.useStyles();

    const options = {
        threshold: 0.0,
        ignoreLocation: true,
        keys: ["groupTitle", "groupDescription"]
    }

    const [, forceUpdateState] = useState();
    const forceUpdate = useCallback(() => forceUpdateState({}), []);

    const getAllGroups = async () => {
        await fetch("http://localhost:5000/allGroups/", {
            credentials: "include",
        })
            .then((response) => response.json())
            .then((result) => {
                setAllGroups(result)
            })
            .catch((error) => console.log(error));
    }

    const handleGroupTitleChange = () => {
        if (allGroups && values.groupTitle.length > 0) {
            const fuse = new Fuse(allGroups, options)
            let results = fuse.search(values.groupTitle);
            results = results.filter((group) => {
                return (
                    (group.item.institution === 'הכל' || group.item.institution === user?.institute)
                )
            });
            setSuggestions(results);
            if (results.length > 0) {
                setShowSuggestions(true);
                setTotalPages(Math.ceil(results.length / itemsPerPage));
                setCurrentPage(1);
            }
            else {
                setShowSuggestions(false);
            }
        }
    };

    useEffect(() => {
        if (!isEdit) {
            setUserFromDB(setUser).then();
        }
    }, [isEdit]);

    useEffect(() => {
        getAllGroups().then();
        setItemsPerPage(Math.max(2 * getColumns(), 4));
    }, []);

    useEffect(() => {
        handleGroupTitleChange();
    }, [values]);

    const handleNext = async (event) => {
        event.preventDefault();
        await getSchema(activeStep).validate(values, { abortEarly: false }).then(() => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }).catch((err) => {
            errors = err;
        });
        forceUpdate();
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        forceUpdate();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await getSchema(activeStep).validate(values, { abortEarly: false })
            .then(() => {
                // Prevents multi-submitting the same group by rapid clicking the button.
                currentTimeClicked = performance.now();
                let diff = currentTimeClicked - lastTimeClicked;
                lastTimeClicked = currentTimeClicked;
                if (diff <= 1000) {
                    throw new Error('Tried to create multiple identical groups rapidly.');
                }
            })
            .then(() => {
                let unAuthorized = false;
                fetch("http://localhost:5000/group", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                })
                    .then((response) => {
                        if (!response.ok) {
                            unAuthorized = true;
                        }
                        return response.text();
                    })
                    .then((data) => {
                        if (unAuthorized) {
                            throw data;
                        }
                        console.log(values);
                    })
                    .then(() => {
                        setActiveStep((prevActiveStep) => prevActiveStep + 1)
                        setTimeout(function () {
                            history.push('/');
                        }, 3000);
                    })
                    .catch((error) => console.log(error));
            }).catch((err) => {
                errors = err;
            });
        forceUpdate();
    };

    const getColumns = () => {
        if (isWidthUp('xl', props.width)) {return 3}
        if (isWidthUp('lg', props.width)) {return 2}
        if (isWidthUp('md', props.width)) {return 1}
        if (isWidthUp('sm', props.width)) {return 1}
        return 1;
    }

    if (suggestions.length !== 0) {
        pageSuggestions = suggestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        columns = Math.min(pageSuggestions?.length, getColumns());
    }

    return (
        <div className={classes.page}>
            <Card className={classes.card}>
                <CardContent>
                    <form>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => {
                                return (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep >= steps.length ? (
                            <Styles.FinishForm>
                                הקבוצה נוצרה בהצלחה!
                            </Styles.FinishForm>
                        ) : (
                            <div>
                                <FormStepContent activeStep={activeStep} errors={errors}
                                                 values={values} setValues={setValues}
                                                 setIsGroupTitleOutOfFocus={setIsGroupTitleOutOfFocus}
                                />
                                <ButtonGroup style={{marginTop: 20}}>
                                    {activeStep === 0 ? (
                                        <Button variant={"outlined"} color={"primary"}
                                                style={{borderWidth: '1.5px'}}
                                                size={"large"} onClick={history.goBack}>
                                            ביטול
                                        </Button>
                                    ) : (
                                        <Button variant={"outlined"} color={"primary"}
                                                style={{borderWidth: '1.5px'}}
                                                size={"large"} onClick={handleBack}>
                                            חזרה
                                        </Button>
                                    )}
                                    {activeStep === steps.length - 1 ? (
                                        <Button type={"submit"}
                                                variant={"contained"} color={"primary"}
                                                style={{boxShadow: '0 0 0 0'}}
                                                size={"large"} onClick={handleSubmit}
                                        >
                                            סיום
                                        </Button>
                                    ) : (
                                        <Button variant={"contained"} color={"primary"}
                                                style={{boxShadow: '0 0 0 0'}}
                                                size={"large"} onClick={handleNext}>
                                            המשך
                                        </Button>
                                    )}
                                </ButtonGroup>
                            </div>
                        )}
                    </form>
                </CardContent>
            </Card>
            { showSuggestions && activeStep === 0 && !isEdit && values?.groupTitle.length > 0 && isGroupTitleOutOfFocus &&
            <div className={classes.card}>
                <CardContent>
                    ניתן גם להצטרף לקבוצה קיימת:
                </CardContent>
                <GroupsList>
                    <GridList
                        cellHeight={'auto'} spacing={0}
                        style={{ width: '100%' }} cols={columns}>
                        {suggestions && pageSuggestions.map(group => (
                            <GridListTile key={group.item._id}>
                                <GroupProfile group={group.item} isProfile={false} userID={user?._id} />
                            </GridListTile>
                        ))}
                    </GridList>
                </GroupsList>
                <PaginationLine totalPages={totalPages}
                                currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
            }
        </div>
    )
}

export default withWidth()(CreateGroup);
