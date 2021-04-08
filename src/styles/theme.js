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
    },
    direction: 'rtl',
})

export default theme;