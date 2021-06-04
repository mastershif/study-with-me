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
