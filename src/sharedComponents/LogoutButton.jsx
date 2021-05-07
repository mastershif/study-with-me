import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@material-ui/core/Button';
import "../styles/GFStyle.css";


const LogoutButton = () => {
    const { logout, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && (
        <Button
            onClick={() => logout()}
            id="qsLoginBtn"
            variant="danger"
            className="loginBtn"
            >

                להתנתקות 
          </Button>
        )
    );
};

export default LogoutButton;