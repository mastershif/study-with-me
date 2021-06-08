import {Avatar, Container, CssBaseline} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {makeStyles} from "@material-ui/core/styles";
import {GoogleLogin} from "react-google-login";
import styled from "styled-components";
import {useHistory} from "react-router-dom";
import {setImageInLocalStorage} from "../localStorage.service";


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
}));

const ButtonContainer = styled.div`
  padding-top: 2rem;
  align-items: center;
  min-width: 200px;
`;

const SignIn = ({isLoggedIn, setIsLoggedIn}) => {

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
    let isNew = true;
    await fetch("http://localhost:5000/signIn/", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + response.tokenObj.id_token,
      }
    })
        .then((res) => {
              if (res.ok) {
                isNew = false;
                setImageInLocalStorage(userDetails.imageUrl);
                setIsLoggedIn(true);
                return res.json()
              }
              return Promise.reject(res.json());
            }
        )
        .catch((error) => {console.log("There was a problem in Signing-in!", error)});
    if (isNew) {
      await fetch("http://localhost:5000/signIn/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + response.tokenObj.id_token,
        },
        body: JSON.stringify({
          username: userDetails.firstName + " " + userDetails.lastName,
          email: userDetails.email,
          institute: "אחר",
          degree: "אחר",
          userImg: userDetails.imageUrl
        }),
      })
          .then((res) => {
                if (res.ok) {
                  setImageInLocalStorage(userDetails.imageUrl);
                  setIsLoggedIn(true);
                  return res.json()
                }
                return Promise.reject(res.json());
              }
          )
          .catch((error) => {console.log("There was a problem in Signing-in!", error)});
      window.location.href = "/profileSettings";
    } else {
      setTimeout(function () {
        history.push('/');
      }, 10);
    }
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
                    clientId={process.env.REACT_APP_GOOGLE_AUTH_CLIENT_ID}
                    onSuccess={onLoginViaGoogle}
                    buttonText={"התחבר/י עם גוגל"}
                    cookiePolicy={"single_host_origin"}
                />
            )}
          </ButtonContainer>
        </div>
      </Container>
  );
};

export default SignIn;