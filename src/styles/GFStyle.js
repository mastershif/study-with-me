import { StyleSheet } from 'react-native-web';
import { makeStyles } from '@material-ui/core/styles';


export const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20
    },
    GooglePlusStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '270px',
        backgroundColor: '#dc4e41',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5 ,
        margin: 5,
    },
    FacebookStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '270px',
        backgroundColor: '#485a96',
        borderWidth: .5,
        borderColor: '#fff',
        height: 50,
        borderRadius: 5,
        margin: 5,
    },
    ImageIconStyle: {
        padding: 10,
        marginRight: 10,
        height: 30,
        width: 30,
        resizeMode : 'stretch',
    },
    TextStyle :{
        color: "#fff",
        margin: 'auto',
        fontSize: 16
    },
    SeparatorLine :{
        backgroundColor : '#fff',
        width: 1,
        marginRight: 10,
        height: 50
    }
})

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}))

