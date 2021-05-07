import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import "../styles/GFStyle.css";


const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
        <Button
            onClick={() => loginWithRedirect()}
            id="qsLoginBtn"
            variant="primary"
            className="loginBtn"
            >

                להתחברות
            </Button>
        )
    );
};

export default LoginButton;