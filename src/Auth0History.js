import React from 'react';
import { useHistory } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0History = ({children}) => {
    const history = useHistory();
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const client_id = process.env.REACT_APP_AUTH0_CLIENT_ID;


const onRedirectCallBack = (state) => {
    history.pushState(state?.returnTo || window.location.pathname);
};

return (
    <Auth0Provider
            domain={domain}
            client_id={client_id}
            redirctUri={window.location.origin}
            onRedirectCallBack={onRedirectCallBack}
            >
                {children}
            </Auth0Provider>
);
};

export default Auth0History;