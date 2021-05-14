import React from "react";
import ProfileProperties from "./profileSettingsComponents/profileProperties";
import Grid from "@material-ui/core/Grid";
import UserImage from "./profileSettingsComponents/imageButton";

const ProfileSettings = () => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <UserImage />
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <ProfileProperties />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ProfileSettings;
