import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import GroupProfile from "../groupDialogComponents/groupProfile";
import styled from "styled-components";
import userDanaMastergroups from "../../mockData/DanasGroups";
import {
  GridList,
  GridListTile,
  isWidthUp,
  withWidth,
} from "@material-ui/core";

class DataDisplay extends Component {
  state = {
    username: "Master Dana",
    eMailAddress: "dana.poleg@gmail.com",
    institute: "אוניברסיטת תל-אביב",
    degree: "ראשון",
    major: "מדעי המחשב",
    minor: "פיזיקה",
    groups: ["אלגברה לינארית 1", "מבוא לאקונומטריקה", "מבוא לחקר תרבויות"],
  };

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
      return (
        <Grid container spacing={10} direction="row" justify="center">
          <Grid item xs={5}>
            <h4>שם משתמש:</h4>
            <h4>כתובת אימייל:</h4>
            <h4>מוסד לימודים:</h4>
            <h4>תואר:</h4>
            <h4>חוג ראשי:</h4>
            <h4>חוג משני:</h4>
          </Grid>
          <Grid item xs={7}>
            <h4>{this.state.username}</h4>
            <h4>{this.state.lastName}</h4>
            <h4>{this.state.eMailAddress}</h4>
            <h4>{this.state.institute}</h4>
            <h4>{this.state.degree}</h4>
            <h4>{this.state.major}</h4>
            <h4>{this.state.minor}</h4>
          </Grid>
        </Grid>
      );
    } else if (toBeDisplayed === "Groups") {
      return (
        <div>
          <GroupsList>
            <GridList
              cellHeight={"auto"}
              spacing={0}
              cols={Math.min(userDanaMastergroups.length, getColumns())}
            >
              {userDanaMastergroups.map((group) => (
                <GridListTile key={group.id} cols={1}>
                  <GroupProfile group={group} isProfile={true} />
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
