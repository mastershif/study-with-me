import React, { Component } from "react";

class UserImage extends Component {
  state = {
    username: "Master Dana",
    emailAddress: "dana.poleg@gmail.com",
    userImg:
      "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
    // "https://images.unsplash.com/photo-1544507888-56d73eb6046e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  };

  async componentDidMount() {
    await fetch(
      "http://localhost:5000/profileSettings/" + this.state.emailAddress
    )
      .then((res) => res.json())
      .then(
        (result) => {
          let updatedUserImg;
          if (result.userImg !== "") {
            updatedUserImg = require("../../" + result.userImg).default; /////// need to change when repositories will be united under one folder
          } else {
            updatedUserImg = this.state.userImg;
          }
          this.setState({
            username: result.username,
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
