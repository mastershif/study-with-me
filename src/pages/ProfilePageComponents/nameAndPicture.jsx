import React, { Component } from "react";
import "../../styles/profilePageStyle.css";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";
import { getUserFromLocalStorage } from "../../localStorage.service";

class NamePicture extends Component {
  state = {
    username: "",
    emailAddress: "",
    userImg: "",
    // "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
  };

  async componentDidMount() {
    let userDetails = getUserFromLocalStorage();
    await fetch("http://localhost:5000/profileSettings/" + userDetails.email)
      .then((res) => res.json())
      .then(
        (result) => {
          let updatedUserImg;
          if (result.userImg !== "") {
            if (result.userImg.includes("http")) {
              updatedUserImg = result.userImg;
            } else {
              updatedUserImg = require("../../" + result.userImg).default; /////// need to change when repositories will be united under one folder
            }
          } else {
            updatedUserImg = this.state.userImg;
          }
          this.setState({
            emailAddress: result.email,
            username: result.username,
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
        <div className="settings-icon">
          <IconButton
            href="/profileSettings"
            style={{ cursor: "hover", backgroundColor: "transparent" }}
            title={"הגדרות פרופיל"}
          >
            <SettingsIcon
              color="secondary"
              style={{ fontSize: 35, padding: 15 }}
            />
          </IconButton>
        </div>
        <h1 className="user-name-header-profile">{this.state.username}</h1>
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
