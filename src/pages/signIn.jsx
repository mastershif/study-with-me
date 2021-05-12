import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import styled from "styled-components";
import {
  setUserInLocalStorage,
  removeUserFromLocalStorage,
} from "../localStorage.service";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ButtonContainer = styled.div`
  padding: 1rem;
  align-items: center;
  min-width: 200px;
`;

const SignIn = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  const classes = useStyles();

  const onLoginViaGoogle = (response) => {
    const profile = response.profileObj;
    const userDetails = {
      email: profile.email,
      firstName: profile.givenName,
      lastName: profile.familyName,
      imageUrl: profile.imageUrl,
    };
    setUserInLocalStorage(userDetails);
    setUser(userDetails);
    setIsLoggedIn(true);
  };

  const onLogoutGoogle = (response) => {
    removeUserFromLocalStorage();
    setIsLoggedIn(false);
    setUser(undefined);
    console.log(response);
    console.log("logged out");
  };

  const onLogoutGoogleFailure = (response) => {
    console.log(response);
    console.log("failed to log out");
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <CssBaseline />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <ButtonContainer>
          {/*show log in button only if the user is not logged in yet*/}
          {!isLoggedIn && (
            <GoogleLogin
              clientId={
                "101612216779-7o7aqog0rj9vopdu7ffukfs67i6n4ba7.apps.googleusercontent.com"
              }
              onSuccess={onLoginViaGoogle}
              buttonText={"להתחבר"}
              cookiePolicy={"single_host_origin"}
            />
          )}
          {/*show log out button only if the user is logged in*/}
          {isLoggedIn && (
            <GoogleLogout
              clientId={
                "101612216779-7o7aqog0rj9vopdu7ffukfs67i6n4ba7.apps.googleusercontent.com"
              }
              buttonText={"להתנתק"}
              onLogoutSuccess={onLogoutGoogle}
              onFailure={onLogoutGoogleFailure}
            />
          )}
        </ButtonContainer>
      </div>
    </Container>
  );
};

export default SignIn;
