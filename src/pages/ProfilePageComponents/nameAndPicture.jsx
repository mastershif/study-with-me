import React, { Component } from "react";
import "../../styles/profilePageStyle.css";
import SettingsIcon from "@material-ui/icons/Settings";
import IconButton from "@material-ui/core/IconButton";

class NamePicture extends Component {
    state = {
        username: "",
        emailAddress: "",
        userImg: ""
    };

    async componentDidMount() {
        await fetch("http://localhost:5000/profileSettings/", {
            credentials: "include",
        })
            .then((res) => {
                if (res.ok) {
                    return res.json()
                }
                return Promise.reject(res.json());
            })
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
                        userImg: updatedUserImg
                    });
                },
            )
            .catch((error) => {console.log("There was a problem!", error)});
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
