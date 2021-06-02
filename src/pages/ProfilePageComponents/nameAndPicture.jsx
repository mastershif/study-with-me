import React, { Component } from "react";
import "../../styles/profilePageStyle.css";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import { getUserFromLocalStorage } from "../../localStorage.service";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';

class NamePicture extends Component {
  state = {
    username: "",
    emailAddress: "",
    userImg: "",
    // "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
    integrateCalendar: false
  };

  async componentDidMount() {
    let userDetails = getUserFromLocalStorage();
    await fetch("http://localhost:5000/profileSettings/" + userDetails.email)
      .then((res) => res.json())
      .then(
        (result) => {
          let updatedUserImg;
          if (result[0].userImg !== "") {
            if (result[0].userImg.includes("http")) {
              updatedUserImg = result[0].userImg;
            } else {
              updatedUserImg = require("../../" + result[0].userImg).default; /////// need to change when repositories will be united under one folder
            }
          } else {
            updatedUserImg = this.state.userImg;
          }
          this.setState({
            emailAddress: result[0].email,
            username: result[0].username,
            userImg: updatedUserImg,
            integrateCalendar: result[0].calendarIntegration
          });
        },
        (error) => {
          console.log("There was a problem!");
        }
      );
  }

  render() {
    return (
      <div>
        <div>
          <IconButton
            href="/profileSettings"
            style={{ cursor: "hover", backgroundColor: "transparent" }}
            title={"הגדרות פרופיל"}
          >
            <SettingsIcon
              color="secondary"
              style={{ fontSize: 40, padding: 15 }}
            />
          </IconButton>
          {this.state.integrateCalendar === true ?
            <EventAvailableIcon titleAccess={"הסנכרון עם Google Calendar מופעל"}
                style={{ fontSize: 40, padding: "28px 0px 0px 28px", color: "#009900", float: "left" }} /> :
            <EventBusyIcon titleAccess={"הסנכרון עם Google Calendar מושבת"}
                style={{ fontSize: 40, padding: "28px 0px 0px 28px", color: "#cc0000", float: "left" }} /> }
        </div>
          <h1 className="user-name-header-profile">{this.state.username} </h1>
          <img
            className="user-image"
            src={this.state.userImg}
            alt="אין תמונה להצגה"
            />
      </div>
    );
  }
}

export default NamePicture;
