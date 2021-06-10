import {useCallback, useEffect, useState} from "react";
import * as Styles from "../styles/createGroupStyle";
import {
    ButtonGroup,
    Card,
    CardContent,
    GridList,
    GridListTile,
    isWidthUp,
    Step,
    StepLabel,
    Stepper,
    withWidth
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormStepContent from "./createGroupComponents/formStepContent";
import {formSchema} from "./createGroupComponents/formValidation";
import {useHistory} from "react-router-dom";
import {getUserFromLocalStorage} from "../localStorage.service";
import GroupProfile from "./groupDialogComponents/groupProfile";
import {GroupsList} from "../styles/searchStyle";
import Fuse from "fuse.js";

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
    if (isEdit === true) {
        initialValues = group;
    }
    const [values, setValues] = useState(initialValues);
    const [activeStep, setActiveStep] = useState(0);
    const [isGroupTitleOutOfFocus, setIsGroupTitleOutOfFocus] = useState(false);
    const [allGroups, setAllGroups] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [suggestions, setSuggestions] = useState([]);
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

    const getAllGroups = () => {
        fetch("http://localhost:5000/allGroups/")
            .then((response) => response.json())
            .then((result) => {
                setAllGroups(result)
            })
            .catch((error) => console.log(error));
    }

    const getUserFromDb = async () => {
        const userDetails = getUserFromLocalStorage();
        const userFromDb = await fetch("http://localhost:5000/profileSettings/" + userDetails?.email)
            .then(response => response.json());
        initialValues.admin = userFromDb._id;
    }

    const handleGroupTitleChange = () => {
        if (allGroups && values.groupTitle.length > 0) {
            const fuse = new Fuse(allGroups, options)
            let results = (
                fuse.search(values.groupTitle)
            )
            setSuggestions(results);
            if (results.length > 0) {
                setShowSuggestions(true);
            };
        }
    };

    useEffect(() => {
        if (!isEdit) {
            getUserFromDb();
        }
    }, [isEdit]);

    useEffect(() => {
        getAllGroups();
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
                fetch("http://localhost:5000/group", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                })
                    .then((response) => response.text())
                    .then(
                        (data) => console.log(data),
                        (error) => console.log(error))
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
        if (isWidthUp('xl', props.width)) {return 3;}
        if (isWidthUp('lg', props.width)) {return 2;}
        if (isWidthUp('md', props.width)) {return 1;}
        if (isWidthUp('sm', props.width)) {return 1;}
        return 1;
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
                    אפשר גם להצטרף לקבוצה קיימת:
                </CardContent>
                <GroupsList>
                    <GridList
                        cellHeight={'auto'}
                        spacing={0}
                        style={{ width: '100%' }}
                        cols={Math.min(suggestions?.length, getColumns())}>
                        {suggestions && suggestions.map(group => (
                            <GridListTile key={group.item._id}>
                                <GroupProfile group={group.item} isProfile={false} userID={initialValues.admin} />
                            </GridListTile>
                        ))}
                    </GridList>
                </GroupsList>
            </div>
            }
        </div>
    )
}

export default withWidth()(CreateGroup);
