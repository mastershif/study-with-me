import React, { Component } from "react";
import DataDisplay from "./dataDisplay";
import Grid from "@material-ui/core/Grid";
import "../../styles/profilePageStyle.css";

class ProfileMenu extends Component {

  render() {
    return (
      <div>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <DataDisplay />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProfileMenu;
