import {useCallback, useEffect, useState} from "react";
import * as Styles from "../styles/createGroupStyle"
import {ButtonGroup, Card, CardContent, Step, StepLabel, Stepper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormStepContent from "./createGroupComponents/formStepContent";
import {formSchema} from "./createGroupComponents/formValidation";
import {useHistory} from "react-router-dom";
import {getUserFromLocalStorage} from "../localStorage.service";

let errors = {};
let lastTimeClicked = 0, currentTimeClicked;

let initialValues = {
    _id: '', groupTitle: '', groupDescription: '', groupPurpose: '', institution: false,
    groupSize: '', date: null, startHour: null, endHour: null,
    meetingType: 'פרונטלית', city: '', place: '', link: '', admin: undefined
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
    let history = useHistory();
    const steps = getSteps();
    const classes = Styles.useStyles();

    const [, forceUpdateState] = useState();
    const forceUpdate = useCallback(() => forceUpdateState({}), []);

    const getUserFromDb = async () => {
        const userDetails = getUserFromLocalStorage();
        const userFromDb = await fetch("http://localhost:5000/profileSettings/" + userDetails?.email)
            .then(response => response.json());
        initialValues.admin = userFromDb._id;
    }
    useEffect(() => {
        if (!isEdit) {
            getUserFromDb();
        }
    }, [isEdit]);

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
        </div>
    )
}

export default CreateGroup;
