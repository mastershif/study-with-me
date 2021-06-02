import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { Component } from "react";
import ProfileProperty from "./profileProperty";
import Grid from "@material-ui/core/Grid";
import { major_minor } from "./Categories data/categoriesDB";
import { degree } from "./Categories data/categoriesDB";
import { institutions } from "./Categories data/categoriesDB";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import { getUserFromLocalStorage } from "../../localStorage.service";

class ProfileProperties extends Component {
  state = {
    username: "",
    emailAddress: "",
    institute: "",
    degree: "",
    major: "",
    minor: "",
    integrateCalendar: false,
    oAuthConsentUrl: ''
  };

  async componentDidMount() {
    let userDetails = getUserFromLocalStorage();
    await fetch("http://localhost:5000/profileSettings/" + userDetails.email)
        .then((res) => res.json())
        .then(
            (result) => {
              this.setState({
                emailAddress: result[0].email,
                username: result[0].username,
                institute: result[0].institute,
                degree: result[0].degree,
                major: result[0].major,
                minor: result[0].minor,
                integrateCalendar: result[0].calendarIntegration,
                oAuthConsentUrl: result[1]
              });
            },
            (error) => {
              console.log(error);
              console.log("There was a problem!");
            }
        );
  }

  updateUserProperties = () => {
    fetch("http://localhost:5000/profileSettings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.emailAddress,
        institute: this.state.institute,
        degree: this.state.degree,
        major: this.state.major,
        minor: this.state.minor,
        calendarIntegration: this.state.integrateCalendar
      }),
    })
        .then((response) => response.text())
        .then((data) => console.log(data))
        .then(() => (window.location.href = "/profile"));
  };

  handleCalendarSwitch = (event) => {
    if (!event.target.checked) {
      this.setState({ integrateCalendar: event.target.checked });
    } else {
      window.location.href = this.state.oAuthConsentUrl;
    }
  };

  handleUsernameChange = (newUsername) => {
    if (newUsername !== "") {
      this.setState({ username: newUsername });
    }
  };

  handleInstituteChange = (newInstitute) => {
    this.setState({ institute: newInstitute });
  };

  handleDegreeChange = (newDegree) => {
    this.setState({ degree: newDegree });
  };

  handleMajorChange = (newMajor) => {
    this.setState({ major: newMajor });
  };

  handleMinorChange = (newMinor) => {
    this.setState({ minor: newMinor });
  };

  render() {
    return (
        <div>
          <FormControlLabel style={{paddingRight: 15}}
                            control={<Switch checked={this.state.integrateCalendar} onChange={this.handleCalendarSwitch} name="calendar" />}
                            label={"סנכרן את מועדי הקבוצות שלי ל-Google Calendar"}
          />
          <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
              className="flex-container"
          >
            <div style={{ display: "flex", flexGrow: "6" }}>
              <Grid container>
                <Grid item xs={12}>
                  <h4
                      style={{ padding: "20px 0px 20px 0px", textAlign: "center" }}
                  >
                    כתובת אימייל:
                  </h4>
                  <h4
                      style={{ padding: "18px 0px 20px 0px", textAlign: "center" }}
                  >
                    שם משתמש:
                  </h4>
                  <h4
                      style={{ padding: "18px 0px 20px 0px", textAlign: "center" }}
                  >
                    מוסד לימודים:
                  </h4>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <h4 style={{ padding: "20px 35px 0px 20px" }}>
                    {this.state.emailAddress}
                  </h4>
                  <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "0px 20px 0px 20px",
                      }}
                  >
                    <ProfileProperty
                        id="שם משתמש"
                        userValue={this.state.username}
                        handleChange={this.handleUsernameChange}
                    />
                  </div>
                  <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "15px 28px 0px 20px",
                      }}
                  >
                    <ProfileProperty
                        id="מוסד"
                        userValue={this.state.institute}
                        data={institutions.sort((a, b) => {
                          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                        })}
                        handleChange={this.handleInstituteChange}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
            <div style={{ display: "flex", flexGrow: "6" }}>
              <Grid container>
                <Grid item xs={12}>
                  <h4
                      style={{ padding: "20px 0px 20px 0px", textAlign: "center" }}
                  >
                    תואר:
                  </h4>
                  <h4
                      style={{ padding: "18px 25px 20px 0px", textAlign: "center" }}
                  >
                    חוג ראשי:
                  </h4>
                  <h4
                      style={{ padding: "18px 20px 20px 0px", textAlign: "center" }}
                  >
                    חוג משני:
                  </h4>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "20px 20px 0px 15px",
                      }}
                  >
                    <ProfileProperty
                        id="תואר"
                        userValue={this.state.degree}
                        data={degree}
                        handleChange={this.handleDegreeChange}
                    />
                  </div>
                  <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "25px 20px 21px 15px",
                      }}
                  >
                    <ProfileProperty
                        id="חוג ראשי"
                        userValue={this.state.major}
                        data={major_minor.sort((a, b) => {
                          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                        })}
                        handleChange={this.handleMajorChange}
                    />
                  </div>
                  <div
                      style={{
                        display: "flex",
                        alignItems: "flex-end",
                        padding: "3px 20px 21px 15px",
                      }}
                  >
                    <ProfileProperty
                        id="חוג משני"
                        userValue={this.state.minor}
                        data={major_minor.sort((a, b) => {
                          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
                        })}
                        handleChange={this.handleMinorChange}
                    />
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
          <div style={{textAlign: "center", padding: "0px 0px 20px 0px"}}>
            <Button variant="contained" color="primary"
                    size={"large"} startIcon={<SaveIcon />}
                onClick={() => this.updateUserProperties()}>
              שמירה
            </Button>
          </div>
        </div>
    );
  }
}

export default ProfileProperties;
