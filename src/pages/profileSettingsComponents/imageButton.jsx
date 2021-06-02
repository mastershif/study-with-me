import React, { Component } from "react";
import { getUserFromLocalStorage } from "../../localStorage.service";

class UserImage extends Component {
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

  handleImgChange = (event) => {
    this.setState({ userImg: URL.createObjectURL(event.target.files[0]) });
    let newImg = new FormData();
    newImg.append("userImage", event.target.files[0]);
    fetch("http://localhost:5000/profileSettings/" + this.state.emailAddress, {
      method: "PUT",
      body: newImg,
    })
      .then((response) => response.text())
      .then((data) => console.log(data));
  };

  render() {
    return (
      <div>
        <h1 className="user-name-header-settings">{this.state.username}</h1>
        <div className="label-user-image">
          <label htmlFor="img-upload" className="user-img-upload">
            <input
              id="img-upload"
              type="file"
              onChange={this.handleImgChange}
              hidden
            />
            <img
              title={"החלפת תמונת פרופיל"}
              className="user-image"
              src={this.state.userImg}
              alt="אין תמונה"
            />
          </label>
        </div>
      </div>
    );
  }
}

export default UserImage;
