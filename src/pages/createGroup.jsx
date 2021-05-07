import {useCallback, useState} from "react";
import * as Styles from "../styles/createGroupStyle"
import {ButtonGroup, Card, CardContent, Step, StepLabel, Stepper} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormStepContent from "./createGroupComponents/formStepContent";
import {formSchema} from "./createGroupComponents/formValidation";


const initialValues = {
    groupTitle: '', groupDescription: '', groupPurpose: '', institution: false,
    groupSize: '', date: null, startHour: null, endHour: null, calendar: false,
    meetingType: 'פרונטלית', city: '', place: '', link: '',
}

let errors = {};

const getSteps = () => {
    return ['נושא ותיאור', 'זמן וגודל', 'מיקום'];
}

const getSchema = (activeStep) => {
    return formSchema[activeStep];
}

const CreateGroup = () => {

    const [values, setValues] = useState(initialValues);
    const [activeStep, setActiveStep] = useState(0);
    const steps = getSteps();
    const classes = Styles.useStyles();

    const [, forceUpdateState] = useState();
    const forceUpdate = useCallback(() => forceUpdateState({}), []);

    const handleNext = async (event) => {
        event.preventDefault();
        await getSchema(activeStep).validate(values, { abortEarly: false }).then( () => {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }).catch( (err) => {
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
        await getSchema(activeStep).validate(values, { abortEarly: false }).then( () => {
            fetch("http://localhost:5000/group", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })
                .then((response) => response.text())
                .then((data) => console.log(data))
                .then(() => setActiveStep((prevActiveStep) => prevActiveStep + 1));
        }).catch( (err) => {
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
                        {activeStep === steps.length ? (
                            <Styles.FinishForm>
                                הקבוצה נוצרה בהצלחה!
                            </Styles.FinishForm>
                        ) : (
                            <div>
                                <FormStepContent activeStep={activeStep} errors={errors}
                                                 values={values} setValues={setValues}
                                />
                                <ButtonGroup style={{marginTop: 20}}>
                                    <Button disabled={activeStep === 0} variant={"contained"}
                                            color={"secondary"} size={"large"} onClick={handleBack}>
                                        חזרה
                                    </Button>
                                    {activeStep === steps.length - 1 ? (
                                        <Button variant={"contained"} type={"submit"}
                                                color={"primary"} size={"large"}
                                                onClick={handleSubmit}
                                        >
                                            סיום
                                        </Button>
                                    ) : (
                                        <Button variant={"contained"}
                                                color={"primary"} size={"large"}
                                                onClick={handleNext}>
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
