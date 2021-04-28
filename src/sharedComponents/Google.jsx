import React from 'react';

import { View, Text, Image, TouchableOpacity, Button} from 'react-native-web';
import GoogleIcon from '../assets/Google_Plus.png';
import Styles from '../styles/GFStyle'

export default class Google extends React.Component {

    initializeGoogleSignIn() {
        window.gapi.load('auth2', () => {
            var auth2 = window.gapi.auth2.init({
                client_id: '558345844309-kpdrf6fgeblictaont3urbjue05r9ot5.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email',
                fetch_basic_profile: false,
                hosted_domain: (GoogleUser) => {GoogleUser.getHostedDomain()}, // for G Suite domain
                ux_mode: 'redirect'
            });
            console.log('Api inited')

            auth2.attachClickHandler(Styles.GooglePlusStyle, {}, 
                (googleUser) => {console.log('Signed in: ' + googleUser.getBasicProfile().getName());},
                (error) => {console.log('Sign-in error', error);});

            /*window.gapi.load('signin2', () => {
            const params = {
                onSuccess: () => { console.log ('User has finished signing in!')},
                //onPress: (res) => { Alert.alert('[Login Success] currentUser:', res.profileObj)},
            }
            window.gapi.signin2.render('loginButton', params)
            })*/
            window.gapi.signin2.render('Styles.GooglePlusStyle')
        });     
    }

    insertGapiScript() {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/platform.js'
        script.onload = () => {
        this.initializeGoogleSignIn()
        }
        document.body.appendChild(script)
    }

    useEffect= () => {
        console.log('Loading')
        this.insertGapiScript();
    }

    render() {
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap' }} >
                <View style={styles.MainContainer}>
                    <TouchableOpacity style={styles.GooglePlusStyle}
                                        activeOpacity={0.5}>
                        <Image
                            source={GoogleIcon}
                            style={styles.ImageIconStyle}
                        />
                        <View style={styles.SeparatorLine} />
                        <Text style={styles.TextStyle}>התחבר\י דרך גוגל</Text>
                
                    </TouchableOpacity>
                </View>
            </div>
        )
    }
}