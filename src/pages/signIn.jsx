import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { GoogleLogin } from 'react-google-login';
import FacebookLoginWithButton from 'react-facebook-login';

//Google
const clientId ='YOUR_CLIENT_ID.apps.googleusercontent.com';
const onSuccess = (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);
};
const onFailure = (res) => {
    console.log('[Login Failed] res:', res);
};

//Facebook
const responseFacebook = (response) => {
  console.log(response);
}
const componentClicked = () => {
  console.log( "Clicked!" )
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          התחברות
        </Typography>
        
        <GoogleLogin
          clientId={clientId}
          buttonText="התחבר/י דרך גוגל"
          position="relative"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '1000px' }}
          isSignedIn={true}/>

        <FacebookLoginWithButton
          appId="1206715649505081"
          fields="name,email,picture"
          onClick={componentClicked}
          callback={responseFacebook}
          textButton = "&nbsp;&nbsp;התחבר/י דרך פייסבוק"
          icon="fa-facebook"/>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="כתובת אי-מייל"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="סיסמא"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="זכור אותי"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            התחבר/י
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                שכחת את הסיסמא?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signout" variant="body2">
                {"צור/צרי חשבון חדש"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}