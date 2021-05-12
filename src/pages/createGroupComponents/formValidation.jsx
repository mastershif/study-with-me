import * as yup from "yup";

const todayDate = new Date();
todayDate.setHours(0, 0, 0, 0);

const firstSchema = yup.object().shape({
  groupTitle: yup
    .string()
    .typeError("נא לכתוב את נושא הקבוצה.")
    .max(40, "הנושא יכול להכיל לכל היותר 40 תווים.")
    .required("נא לכתוב את נושא הקבוצה."),
  groupDescription: yup
    .string()
    .max(500, "התיאור יכול להכיל לכל היותר 500 תווים."),
  groupPurpose: yup
    .string()
    .typeError("נא לבחור מטרה.")
    .required("נא לבחור מטרה."),
  institution: yup.boolean(),
});

const secondSchema = yup.object().shape({
  groupSize: yup
    .number()
    .typeError("נא למלא את מספר המשתתפים/ות.")
    .integer()
    .min(2, "על הקבוצה להכיל לכל הפחות 2 משתתפים/ות.")
    .max(100, "על הקבוצה להכיל לכל היותר 100 משתתפים/ות.")
    .required("נא למלא את מספר המשתתפים/ות."),
  date: yup
    .date()
    .typeError("נא להזין תאריך עתידי חוקי.")
    .min(todayDate, "נא להזין תאריך עתידי חוקי.")
    .required("נא להזין תאריך עתידי חוקי."),
  startHour: yup
    .date()
    .typeError("נא לבחור שעת התחלה.")
    .required("נא לבחור שעת התחלה."),
  endHour: yup
    .date()
    .typeError("נא לבחור שעת סיום.")
    .min(yup.ref("startHour"), "על שעת הסיום להיות מאוחרת משעת ההתחלה.")
    .required("נא לבחור שעת סיום."),
  calendar: yup.boolean(),
});

const thirdSchema = yup.object().shape({
  meetingType: yup.string().oneOf(["וירטואלית", "פרונטלית"]),
  city: yup
    .string()
    .typeError("נא לבחור עיר.")
    .when("meetingType", {
      is: "פרונטלית",
      then: yup
        .string()
        .typeError("נא לבחור עיר.")
        .required("נא לבחור עיר."),
    }),
  place: yup
    .string()
    .typeError("נא לציין מקום מפגש.")
    .when("meetingType", {
      is: "פרונטלית",
      then: yup
        .string()
        .typeError("נא לציין מקום מפגש.")
        .required("נא לציין מקום מפגש."),
    }),
  link: yup
    .string()
    .typeError("נא לספק קישור לקבוצה.")
    .when("meetingType", {
      is: "וירטואלית",
      then: yup
        .string()
        .typeError("נא לספק קישור לקבוצה.")
        .required("נא לספק קישור לקבוצה."),
    }),
});

export const formSchema = [firstSchema, secondSchema, thirdSchema];
