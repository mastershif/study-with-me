import React, { useContext } from 'react';
//import { BrowserRouter, Link, Redirect, Route, Router, Switch } from 'react-router-dom';

import "../styles/GFStyle.css";
//import App from '../App';
//import SignIn from '../pages/signIn';

/*
const GoogleAuthContext = React.createContext()

const GoogleAuthProvider = ({ children }) => {
    const googleAuth = useGoogleLogin({
      clientId: '558345844309-kpdrf6fgeblictaont3urbjue05r9ot5.apps.googleusercontent.com',
    })
  
    return (
      <GoogleAuthContext.Provider value={googleAuth}>
        {children}
      </GoogleAuthContext.Provider>
    )
  }

*/


/*const Profile = () => {
    const authInstance = window.gapi.auth2.getAuthInstance()
    const user = authInstance.currentUser.get()
    const profile = user.getBasicProfile()
    const email = profile.getEmail()
    const imageUrl = profile.getImageUrl()

    return (
        <button className="loginBtn loginBtn--google" ref="googleLoginBtn"
                onClick={authInstance.profile}>
        </button> 
    )
}*/


export default class Google extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false,
            isSignedIn: null,
            accessToken: ''
        }
        this.initializeGoogleSignIn = this.initializeGoogleSignIn.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogin(response) {
        if(response.accessToken) {
          this.setState(state => ({
            isSignedIn: true,
            accessToken: response.accessToken
          }));
        }
    }

    handleLogout (response) {
        this.setState(state => ({
            isSignedIn: false,
            accessToken: ''
        }));
    }

    
    initializeGoogleSignIn() {
        window.gapi.load('auth2', () => {
            this.auth2 = window.gapi.auth2.init({
                client_id: '558345844309-kpdrf6fgeblictaont3urbjue05r9ot5.apps.googleusercontent.com',
                cookiepolicy: 'none',
                scope: 'profile email'
                //fetch_basic_profile: false,
                //hosted_domain: (GoogleUser) => {GoogleUser.getHostedDomain()}, // for G Suite domain
                //ux_mode: 'redirect'
            })
            /*.then(() => { const authInstance = window.gapi.auth2.getAuthInstance()
                            const isSignedIn = authInstance.isSignedIn.get()
                            this.setState({isSignedIn})

                            authInstance.isSignedIn.listen(isSignedIn => {
                                this.setState({isSignedIn})
                            })

                    })*/
            console.log('Api initialized');
            this.prepareLoginButton();

        /*window.gapi.load('signin2', () => {
            const params = {
                width:240,
                height:50,
                longtitle:true,
                theme:'dark',
                onSuccess: () => { console.log ('User signs in!')}
            }
            window.gapi.signin2.render('my-signin2', params)
        })*/
        //window.gapi.signin2.render(this.element)
        })   
    }
  
    prepareLoginButton() {
        console.log(this.refs.googleLoginBtn);
        this.auth2.attachClickHandler(this.refs.googleLoginBtn, {}, 
            function(googleUser) {
                console.log('ID: ' + googleUser.getBasicProfile().getId());
                console.log('Name: ' + googleUser.getBasicProfile().getName());
                console.log('E-mail: ' + googleUser.getBasicProfile().getEmail());
                console.log('Id_Token' + googleUser.getAuthResponse().id_token); // The ID token to pass to the backend
                console.log('Image_URL: ' + googleUser.getBasicProfile().getImageUrl());
                onsubmit( () => { console.log ('User signs in!');
                                    window.location.href='/';
                                    this.setState({isSignedIn: true}) })            
            },
            function(error) { alert(JSON.stringify(error, undefined, 2)); }
                //console.log('Sign-in error', error);})
        );
    }

    insertGapiScript() {
        const script = document.createElement('script')
        script.src = 'https://apis.google.com/js/platform.js'
        script.onload = () => { this.initializeGoogleSignIn() }
        document.body.appendChild(script)
    }

    componentDidMount() {
        console.log('Loading')
        this.insertGapiScript();
    }

    /*ifSighnedIn() {
        this.state.isSignedIn ?
             <Redirect to="/" />
        :
             <Redirect to="/signIn" />
    }*/

    render() {
        return (
            <button className="loginBtn loginBtn--google" ref="googleLoginBtn"
                            onClick={this.handleLogin}>
                    התחבר\י דרך גוגל
            </button>    
        )
    }
}


