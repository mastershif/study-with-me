import React, { Component } from "react";
import ProfileProperty from "./profileProperty";
import Grid from "@material-ui/core/Grid";
import { major_minor } from "./Categories data/categoriesDB";
import { degree } from "./Categories data/categoriesDB";
import { institutions } from "./Categories data/categoriesDB";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";

class ProfileProperties extends Component {
  state = {
    username: "Master Dana",
    emailAddress: "dana.poleg@gmail.com",
    institute: "אוניברסיטת תל-אביב",
    degree: "ראשון",
    major: "מדעי המחשב",
    minor: "מתמטיקה",
  };

  async componentDidMount() {
    await fetch(
      "http://localhost:5000/profileSettings/" + this.state.emailAddress
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            username: result.username,
            institute: result.institute,
            degree: result.degree,
            major: result.major,
            minor: result.minor,
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
      }),
    })
      .then((response) => response.text())
      .then((data) => console.log(data))
      .then(() => (window.location.href = "/profile"));
  };

  handleUsernameChange = (newUsername) => {
    this.setState({ username: newUsername });
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
                <h3
                  style={{ padding: "0px 0px 20px 0px", textAlign: "center" }}
                >
                  כתובת אימייל:
                </h3>
                <h3
                  style={{ padding: "18px 0px 20px 0px", textAlign: "center" }}
                >
                  שם משתמש:
                </h3>
                <h3
                  style={{ padding: "18px 0px 20px 0px", textAlign: "center" }}
                >
                  מוסד לימודים:
                </h3>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <h3 style={{ padding: "0px 0px 0px 15px" }}>
                  {this.state.emailAddress}
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "0px 0px 0px 15px",
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
                    padding: "23px 0px 0px 15px",
                  }}
                >
                  <ProfileProperty
                    id="מוסד"
                    userValue={this.state.institute}
                    data={institutions}
                    handleChange={this.handleInstituteChange}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
          <div style={{ display: "flex", flexGrow: "6" }}>
            <Grid container>
              <Grid item xs={12}>
                <h3
                  style={{ padding: "0px 0px 20px 0px", textAlign: "center" }}
                >
                  תואר:
                </h3>
                <h3
                  style={{ padding: "18px 0px 20px 0px", textAlign: "center" }}
                >
                  חוג ראשי:
                </h3>
                <h3
                  style={{ padding: "18px 0px 20px 0px", textAlign: "center" }}
                >
                  חוג משני:
                </h3>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "4px 0px 21px 0px",
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
                    padding: "4px 0px 21px 15px",
                  }}
                >
                  <ProfileProperty
                    id="חוג ראשי"
                    userValue={this.state.major}
                    data={major_minor}
                    handleChange={this.handleMajorChange}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "4px 0px 21px 15px",
                  }}
                >
                  <ProfileProperty
                    id="חוג משני"
                    userValue={this.state.minor}
                    data={major_minor}
                    handleChange={this.handleMinorChange}
                  />
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: "0px 0px 20px 0px" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => this.updateUserProperties()}
          >
            <SaveIcon
              style={{ padding: "0px 0px 0px 10px", fontWight: "bold" }}
            ></SaveIcon>
            שמור
          </Button>
        </div>
      </div>
    );
  }
}

export default ProfileProperties;
