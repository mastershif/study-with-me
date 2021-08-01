import {createMuiTheme} from "@material-ui/core/styles";

//Updating the theme for all the site.
//It includes the color palette and the right-to-left direction for material-ui components.

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#007AAF",
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
        primaryDeleted: {
            main: "#90a4ae",
        },
        successDeleted: {
            main: "#9fb5ad"
        },
    },
    direction: 'rtl',
})

export default theme;
