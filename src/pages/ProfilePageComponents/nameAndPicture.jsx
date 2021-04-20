import React, { Component } from "react";
import "../../styles/profilePageStyle.css";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";

class NamePicture extends Component {
  state = {
    name: "Master Dana",
    img:
      "https://images.unsplash.com/photo-1544507888-56d73eb6046e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  };
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
        <h1 className="user-name-header-profile">{this.state.name}</h1>
        <img
          className="user-image"
          src={this.state.img}
          alt="אין תמונה להצגה"
        />
      </div>
    );
  }
}

export default NamePicture;
