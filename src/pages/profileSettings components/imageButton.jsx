import React, { Component } from "react";

class UserImage extends Component {
  state = {
    name: "Master Dana",
    img:
      "https://lh3.googleusercontent.com/proxy/820UyNH3CVw12ji79OgvjPgeRWL0upDMEKEcZmr-qJzk1dWGPHvf1yjINeTySi9wnNMHaJqno0YGlvNoMOcKzdpVtwvkeoUQ3izUngxJFa80DkUYfACAmiIlqPy4",
    // "https://images.unsplash.com/photo-1544507888-56d73eb6046e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
  };

  handleImgChange = (event) => {
    this.setState({ img: URL.createObjectURL(event.target.files[0]) });
  };

  render() {
    return (
      <div>
        <h1 className="user-name-header-settings">{this.state.name}</h1>
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
              src={this.state.img}
              alt="אין תמונה"
            />
          </label>
        </div>
      </div>
    );
  }
}

export default UserImage;
