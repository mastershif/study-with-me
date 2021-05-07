import React from 'react';
import FacebookLoginBtn from 'react-facebook-login';
import { Link } from 'react-router-dom';

import "../styles/GFStyle.css";
//import App from '../App';

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
        //this.resetFields = this.resetFields.bind(this);
        }

    componentClicked() {
        console.log("Clicked!");
    }

    responseFacebook(response) {
        console.log(response);
        if(response.status !== 'unknown')
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
            fbContent = (
                <div>
                    <Link to='App'>
                        <FacebookLoginBtn 
                            appId="491229135363376"
                            //version='v10.0'
                            autoLoad={false}
                            callback={this.setState({isLoggedIn: false})}
                            cssClass="loginBtn loginBtn--facebook"
                            icon={<i className="fa fa-facebook" style={{marginLeft:'5px'}}></i>}
                            textButton = "&nbsp;&nbsp;התנתק\י דרך פייסבוק"
                    />
                    </Link>
                </div>  
            );
        } else {
                fbContent = (<FacebookLoginBtn 
                                appId="491229135363376"
                                //version='v10.0'
                                autoLoad={false}
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                                cssClass="loginBtn loginBtn--facebook"
                                icon={<i className="fa fa-facebook" style={{marginLeft:'5px'}}></i>}
                                textButton = "&nbsp;&nbsp;התחבר\י דרך פייסבוק"
                />);
        }

        return (
            
            <>
            {fbContent}
            </>
        )
    } 
}

    