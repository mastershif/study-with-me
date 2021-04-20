import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { StyleSheet, View, Text, Image, TouchableOpacity, Alert} from 'react-native-web';
import FacebookIcon from '../assets/Facebook_Login_Button.png';
import GoogleIcon from '../assets/Google_Plus.png';

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    GooglePlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '270px',
        backgroundColor: '#dc4e41',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5 ,
        margin: 5,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '270px',
        backgroundColor: '#485a96',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5,
        margin: 5,
    },
    ImageIconStyle: {
        padding: 10,
        marginRight: 10,
        height: 30,
        width: 30,
        resizeMode : 'stretch',
    },
    TextStyle :{
        color: "#fff",
        margin: 'auto',
        fontSize: 16
    },
    SeparatorLine :{
        backgroundColor : '#fff',
        width: 1,
        marginRight: 10,
        height: 50
    }
});

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
}));

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

export default function SignIn() {
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <CssBaseline />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h4">
                    התחברות
                </Typography>
                <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                    <View style={styles.MainContainer}>
                        <TouchableOpacity style={styles.GooglePlusStyle}
                                          activeOpacity={0.5}
                                          onPress={(res) => Alert.alert('[Login Success] currentUser:', res.profileObj)}
                                          cookiePolicy='single_host_origin'
                                          isSignedIn={true}
                                          itemScope='profile email'
                                          clientId={'YOUR_CLIENT_ID.apps.googleusercontent.com'}>
                            <Image
                                source={GoogleIcon}
                                style={styles.ImageIconStyle}
                            />
                            <View style={styles.SeparatorLine} />
                            <Text style={styles.TextStyle}>התחבר/י דרך גוגל</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.FacebookStyle} activeOpacity={0.5}
                                          onPress={() => Alert.alert("Clicked!")}
                                          callback={(response) => console.log(response)}
                                          appId="1206715649505081"
                                          fields="name,email,picture">
                            <Image
                                source={FacebookIcon}
                                style={styles.ImageIconStyle}
                            />
                            <View style={styles.SeparatorLine} />
                            <Text style={styles.TextStyle}>התחבר/י דרך פייסבוק</Text>
                        </TouchableOpacity>
                    </View>
                </div>
            </div>
        </Container>
    );
}