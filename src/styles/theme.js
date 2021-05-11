import {createMuiTheme} from "@material-ui/core/styles";

//Updating the theme for all the site.
//It includes the color palette and the right-to-left direction for material-ui components.

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#007AAF"
        },
        secondary: {
            main: "#FF0053"
        },
        success: {
            main: "#00AD6E"
        },
        background: {
            default: "#f5f5f7"
        },
    },
    direction: 'rtl',
})

export default theme;
