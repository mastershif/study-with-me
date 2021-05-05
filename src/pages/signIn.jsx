import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { StyleSheet, View, TouchableOpacity } from 'react-native-web';

import Google from '../sharedComponents/Google';
import Facebook from '../sharedComponents/Facebook';

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

const SignIn = () => {
            return(
                <Container component="main" maxWidth="xs">
                    <div className={useStyles().paper}>
                        <CssBaseline />
                        <Avatar className={useStyles().avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="4">
                            התחברות
                        </Typography>
                        <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                            <View style={styles.MainContainer}>

                            <Google />  
                            <View style={styles.SeparatorLine} />
                            <Facebook />
                                
                           </View>
                        </div> 
                    </div>
                </Container>
                );
}
export default SignIn;