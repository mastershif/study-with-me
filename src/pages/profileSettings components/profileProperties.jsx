import React, { Component } from "react";
import ProfileProperty from "./profileProperty";
import Grid from "@material-ui/core/Grid";
import { major_minor } from "./Categories data/categoriesDB";
import { degree } from "./Categories data/categoriesDB";
import { institutions } from "./Categories data/categoriesDB";
import IconButton from "@material-ui/core/IconButton";
import UpdateOutlinedIcon from "@material-ui/icons/UpdateOutlined";

class ProfileProperties extends Component {
  state = {
    username: "Master Dana",
    emailAddress: "dana.poleg@gmail.com",
    institute: "אוניברסיטת תל-אביב",
    degree: "ראשון",
    major: "מדעי המחשב",
    minor: "פיזיקה",
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
        <Grid
          container
          spacing={8}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12} md={6}>
            <div style={{ display: "flex" }}>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <h3 style={{ padding: "0px 0px 20px 0px" }}>כתובת אימייל:</h3>
                  <h3 style={{ padding: "18px 0px 20px 0px" }}>שם משתמש:</h3>
                  <h3 style={{ padding: "18px 0px 20px 0px" }}>
                    מוסד לימודים:
                  </h3>
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <h3>{this.state.emailAddress}</h3>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <ProfileProperty
                      id="שם משתמש"
                      userValue={this.state.username}
                      handleChange={this.handleUsernameChange}
                    />

                    <IconButton
                      style={{
                        cursor: "hover",
                        backgroundColor: "transparent",
                        padding: "0px 0px 0px 0px",
                      }}
                      onClick={() => console.log(this.state.username)}
                    >
                      <UpdateOutlinedIcon
                        color="primary"
                        style={{ fontSize: 35, padding: 15 }}
                      />
                    </IconButton>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <ProfileProperty
                      id="מוסד"
                      userValue={this.state.institute}
                      data={institutions}
                      handleChange={this.handleInstituteChange}
                    />

                    <IconButton
                      style={{
                        cursor: "hover",
                        backgroundColor: "transparent",
                        padding: "0px 0px 0px 0px",
                      }}
                      onClick={() => console.log(this.state.institute)}
                    >
                      <UpdateOutlinedIcon
                        color="primary"
                        style={{ fontSize: 35, padding: 15 }}
                      />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} md={6}>
            <div style={{ display: "flex" }}>
              <Grid container spacing={10}>
                <Grid item xs={12}>
                  <h3 style={{ padding: "20px 0px 20px 0px" }}>תואר:</h3>
                  <h3 style={{ padding: "17px 0px 20px 0px" }}>חוג ראשי:</h3>
                  <h3 style={{ padding: "17px 0px 20px 0px" }}>חוג משני:</h3>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <ProfileProperty
                      id="תואר"
                      userValue={this.state.degree}
                      data={degree}
                      handleChange={this.handleDegreeChange}
                    />
                    <IconButton
                      style={{
                        cursor: "hover",
                        backgroundColor: "transparent",
                        padding: "0px 0px 0px 0px",
                      }}
                      onClick={() => console.log(this.state.degree)}
                    >
                      <UpdateOutlinedIcon
                        color="primary"
                        style={{ fontSize: 35, padding: 15 }}
                      />
                    </IconButton>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <ProfileProperty
                      id="חוג ראשי"
                      userValue={this.state.major}
                      data={major_minor}
                      handleChange={this.handleMajorChange}
                    />

                    <IconButton
                      style={{
                        cursor: "hover",
                        backgroundColor: "transparent",
                        padding: "0px 0px 0px 0px",
                      }}
                      onClick={() => console.log(this.state.major)}
                    >
                      <UpdateOutlinedIcon
                        color="primary"
                        style={{ fontSize: 35, padding: 15 }}
                      />
                    </IconButton>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end" }}>
                    <ProfileProperty
                      id="חוג משני"
                      userValue={this.state.minor}
                      data={major_minor}
                      handleChange={this.handleMinorChange}
                    />
                    <IconButton
                      style={{
                        cursor: "hover",
                        backgroundColor: "transparent",
                        padding: "0px 0px 0px 0px",
                      }}
                      onClick={() => console.log(this.state.minor)}
                    >
                      <UpdateOutlinedIcon
                        color="primary"
                        style={{ fontSize: 35, padding: 15 }}
                      />
                    </IconButton>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProfileProperties;
