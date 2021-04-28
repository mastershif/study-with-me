import React, { Component } from 'react';
import FacebookIcon from '../assets/Facebook_Login_Button.png';
import FacebookLogin from 'react-facebook-login';
import Styles from '../styles/GFStyle'


export default class Facebook extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',
            picture: ''
            }
        this.resetFields = this.resetFields.bind(this);
        }

    componentClicked() {
        console.log("Clicked!");
    }

    responseFacebook(response) {
        //console.log(response);
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
            picture: response.picture.data.url 
        });
    }

    render() {
        let fbContent;
        if(this.state.isLoggedIn) {
            fbContent=(
                <div style={Styles.FacebookStyle}>
                 <img src={this.state.picture} alt={this.state.name} />
                </div> 
            );
        } else {
            fbContent = (<FacebookLogin style={Styles.FacebookStyle}
                appId="491229135363376"
                version='v10.0'
                autoLoad={true}
                fields="name,email,picture"
                onClick={this.componentClicked}
                callback={this.responseFacebook} />);
        }

        return (
            <div>
               {fbContent}            
            </div>
        )
    } 

}

    