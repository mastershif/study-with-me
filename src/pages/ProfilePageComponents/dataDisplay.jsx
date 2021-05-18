import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GroupProfile from "../groupDialogComponents/groupProfile";
import styled from "styled-components";
import { GridList, GridListTile, isWidthUp, withWidth, } from "@material-ui/core";
import {getUserFromLocalStorage} from '../../localStorage.service'

class DataDisplay extends Component {
  state = {
    userID: null,
    username: "",
    emailAddress: "",
    institute: "",
    degree: "",
    major: "",
    minor: "",
    userGroups: [],
  };

  async componentDidMount() {
    let userDetails = getUserFromLocalStorage();
    if (userDetails !== null) {
      await fetch("http://localhost:5000/profile/" + userDetails.email)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              userID: result[0]._id,
              emailAddress: result[0].email,
              username: result[0].username,
              institute: result[0].institute,
              degree: result[0].degree,
              major: result[0].major,
              minor: result[0].minor,
              userGroups: result[1],
            });
          },
          (error) => {
            console.log("There was a problem!");
          }
      );
    }
  }

  render() {
    const toBeDisplayed = this.props.toBeDisplayed;
    const GroupsList = styled.ul`
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    `;

    const getColumns = () => {
      if (isWidthUp("xl", this.props.width)) {
        return 5;
      }
      if (isWidthUp("lg", this.props.width)) {
        return 4;
      }
      if (isWidthUp("md", this.props.width)) {
        return 3;
      }
      if (isWidthUp("sm", this.props.width)) {
        return 2;
      }
      return 1;
    };

    if (toBeDisplayed === "Personal") {
      if (
        this.state.degree === "אחר" ||
        this.state.degree === "" ||
        this.state.minor === ""
      ) {
        return (
          <Grid container alignItems={"center"}>
            <Grid item style={{ marginRight: 20 }}>
              <h4>שם משתמש:</h4>
              <h4>כתובת אימייל:</h4>
              <h4>מוסד לימודים:</h4>
              <h4>תואר:</h4>
            </Grid>
            <Grid item style={{ marginRight: 35 }}>
              <h4>{this.state.username}</h4>
              <h4 style={{ fontSize: 14 }}>{this.state.emailAddress}</h4>
              <h4>{this.state.institute}</h4>
              <h4>{this.state.degree}</h4>
            </Grid>
          </Grid>
        );
      } else if (this.state.minor === "") {
        return (
          <Grid container alignItems={"center"}>
            <Grid item style={{ marginRight: 20 }}>
              <h4>שם משתמש:</h4>
              <h4>כתובת אימייל:</h4>
              <h4>מוסד לימודים:</h4>
              <h4>תואר:</h4>
              <h4>חוג ראשי:</h4>
            </Grid>
            <Grid item style={{ marginRight: 35 }}>
              <h4>{this.state.username}</h4>
              <h4 style={{ fontSize: 14 }}>{this.state.emailAddress}</h4>
              <h4>{this.state.institute}</h4>
              <h4>{this.state.degree}</h4>
              <h4>{this.state.major}</h4>
            </Grid>
          </Grid>
        );
      } else {
        return (
          <Grid container alignItems={"center"}>
            <Grid item style={{ marginRight: 20 }}>
              <h4>שם משתמש:</h4>
              <h4>כתובת אימייל:</h4>
              <h4>מוסד לימודים:</h4>
              <h4>תואר:</h4>
              <h4>חוג ראשי:</h4>
              <h4>חוג משני:</h4>
            </Grid>
            <Grid item style={{ marginRight: 35 }}>
              <h4>{this.state.username}</h4>
              <h4 style={{ fontSize: 14 }}>{this.state.emailAddress}</h4>
              <h4>{this.state.institute}</h4>
              <h4>{this.state.degree}</h4>
              <h4>{this.state.major}</h4>
              <h4>{this.state.minor}</h4>
            </Grid>
          </Grid>
        );
      }
    } else if (toBeDisplayed === "Groups") {
      return (
        <div>
          <GroupsList>
            <GridList
              cellHeight={"auto"}
              spacing={0}
              cols={Math.min(this.state.userGroups.length, getColumns())}
            >
              {this.state.userGroups.map((group) => (
                <GridListTile key={group._id} cols={1}>
                  <GroupProfile group={group} isProfile={true} userID={this.state.userID} />
                </GridListTile>
              ))}
            </GridList>
          </GroupsList>
        </div>
      );
    }
  }
}

export default withWidth()(DataDisplay);
