import React from "react";
import ProfileProperties from "./profileSettings components/profileProperties";
import Grid from "@material-ui/core/Grid";
import UserImage from "./profileSettings components/imageButton";

const ProfileSettings = () => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <UserImage />
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center" justify="center">
        <Grid item xs={12}>
          <ProfileProperties />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileSettings;
