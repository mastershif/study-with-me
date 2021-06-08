import React, { Component } from "react";
import {setImageInLocalStorage} from "../../localStorage.service";

class UserImage extends Component {
    state = {
        username: "",
        emailAddress: "",
        userImg: "",
        // "https://www.pngkey.com/png/detail/230-2301779_best-classified-apps-default-user-profile.png",
    };

    async componentDidMount() {
        await fetch("http://localhost:5000/profileSettings", {
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
                        userImg: updatedUserImg,
                    });
                }
            )
            .catch((error) => {console.log("There was a problem!", error)});
    }

    handleImgChange = (event) => {
        this.setState({ userImg: URL.createObjectURL(event.target.files[0]) });
        let newImg = new FormData();
        newImg.append("userImage", event.target.files[0]);
        fetch("http://localhost:5000/profileSettings/userImage", {
            method: "PUT",
            credentials: "include",
            body: newImg,
        })
            .then((response) => {
                response.text();
                setImageInLocalStorage(this.state.userImg);
            })
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
