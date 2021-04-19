import React from "react";
import NamePicture from "./ProfilePageComponents/nameAndPicture";
import ProfileMenu from "./ProfilePageComponents/profileMenu";
import Grid from "@material-ui/core/Grid";

const Profile = () => {
  return (
    <React.Fragment>
      <Grid container>
        <Grid item xs={12}>
          <NamePicture />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <ProfileMenu />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Profile;
