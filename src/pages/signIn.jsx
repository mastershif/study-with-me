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
import {useHistory} from "react-router-dom";

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
  googleLogin: {
    minWidth: '200px',
  },
  googleLogout: {
    minWidth: '140px',
  },
}));

const ButtonContainer = styled.div`
  padding-top: 2rem;
  align-items: center;
  min-width: 200px;
`;

const SignIn = ({ isLoggedIn, setIsLoggedIn, setUser }) => {
  const classes = useStyles();
  const history = useHistory();

  const onLoginViaGoogle = async (response) => {
    const profile = response.profileObj;
    const userDetails = {
      email: profile.email,
      firstName: profile.givenName,
      lastName: profile.familyName,
      imageUrl: profile.imageUrl.replace("s96", "s260"),
    };
    setUserInLocalStorage(userDetails);
    setUser(userDetails);
    setIsLoggedIn(true);
    let isNew = true;
    await fetch("http://localhost:5000/signIn/" + userDetails.email)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result) {
            isNew = false;
          }
        },
        (error) => {
          console.log("There was a problem in Signing-in!");
        }
      );
    if (isNew) {
      await fetch("http://localhost:5000/signIn/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userDetails.firstName + " " + userDetails.lastName,
          email: userDetails.email,
          institute: "אחר",
          degree: "אחר",
          userImg: userDetails.imageUrl,
        }),
      });
      // window.location.href = "/profileSettings";
    } else {
      // window.location.href = "/";
    }
    setTimeout(function () {
      history.push('/');
    }, 10);
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
              className={classes.googleLogin}
              clientId={
                "101612216779-7o7aqog0rj9vopdu7ffukfs67i6n4ba7.apps.googleusercontent.com"
              }
              onSuccess={onLoginViaGoogle}
              buttonText={"התחבר/י עם גוגל"}
              cookiePolicy={"single_host_origin"}
            />
          )}
          {/*show log out button only if the user is logged in*/}
          {/*{isLoggedIn && (*/}
          {/*  <GoogleLogout*/}
          {/*    className={classes.googleLogin}*/}
          {/*    clientId={*/}
          {/*      "101612216779-7o7aqog0rj9vopdu7ffukfs67i6n4ba7.apps.googleusercontent.com"*/}
          {/*    }*/}
          {/*    buttonText={"להתנתק מהאתר"}*/}
          {/*    onLogoutSuccess={onLogoutGoogle}*/}
          {/*    onFailure={onLogoutGoogleFailure}*/}
          {/*  />*/}
          {/*)}*/}
        </ButtonContainer>
      </div>
    </Container>
  );
};

export default SignIn;
