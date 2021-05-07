
import createAuth0Client from '@auth0/auth0-spa-js';


const Auth0 = () => {

    let auth0 = null; //auth0 client
    const fetchAuthConfig = () => fetch("../auth_config.json"); //initialized values

    const configureClient = async () => { //download configuration Client
        const response = await fetchAuthConfig();
        const config = await response.json();

        auth0 = await createAuth0Client({ //initialize the auth0 variable
            domain: config.domain,
            client_id: config.clientId
        });
    };

    window.onload = async () => {
        await configureClient();
        updateUI();

        const isAuthenticated = await auth0.isAuthenticated();

        if (isAuthenticated) { //check whether the user is authenticated 
            <div>Available</div>
            return;
        }

        // NEW - check for the code and state parameters
        const query = window.location.search;
        if (query.includes("code=") && query.includes("state=")) { //start the login process

            await auth0.handleRedirectCallback(); //process the login state
            updateUI();
            window.history.replaceState({}, document.title, "/");
        }
    };

    const updateUI = async () => { //checking the result of calling for enable or disable the Log in and Log out 
        const isAuthenticated = await auth0.isAuthenticated();
    
        document.getElementById("btn-logout").disabled = !isAuthenticated;
        document.getElementById("btn-login").disabled = isAuthenticated;

        /* IF WE WANT TO UNACCESS PAGES FROM THE USERS
        if(isAuthenticated) {
            document.getElementById().classList.remove("hidden");
            document.getElementById().classList.remove("hidden");
        } else {
            document.getElementById().classList.add("hidden");
            document.getElementById().classList.add("hidden");
        }*/
    };

    login = async () => {
        await auth0.loginWithRedirect({
        redirect_uri: window.location.origin
        });
    };

    logout = () => {
        auth0.logout({
        returnTo: window.location.origin
        });
    };
}

export default Auth0;