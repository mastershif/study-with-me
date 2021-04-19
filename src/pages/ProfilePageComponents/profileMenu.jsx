import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DataDisplay from "./dataDisplay";
import Grid from "@material-ui/core/Grid";
import "../../pagesStyle/profilePageStyle.css";

class ProfileMenu extends Component {
  state = {
    chosenData: "Personal",
  };

  changeChosenData = (selection) => {
    this.setState({ chosenData: selection });
  };

  render() {
    return (
      <div>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Grid item xs={12}>
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="large outlined primary button group"
              size="large"
              style={{ fontSize: 100 }}
            >
              <Button onClick={() => this.changeChosenData("Groups")}>
                הקבוצות שלי
              </Button>
              <Button onClick={() => this.changeChosenData("Personal")}>
                פרטי פרופיל
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <DataDisplay toBeDisplayed={this.state.chosenData} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ProfileMenu;
