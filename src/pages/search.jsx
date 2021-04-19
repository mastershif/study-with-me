import GroupProfile from "./groupDialogComponents/groupProfile";
import styled from "styled-components";
import Groups from "../mockData/groupsMockData"
import {GridList, GridListTile, isWidthUp, withWidth} from "@material-ui/core";
import SearchForm from './searchComponents/searchForm';
import {Paper} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import theme from "../styles/theme";
import {useState} from "react";

const useStyles = makeStyles(newStyle => ({
    page: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.background.default
    },
    root: {
        '& .MuiFormControl-root': {
            width: '90%',
            margin: newStyle.spacing(0.5),
        }
    },
}))

const GroupsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Search = (props) => {
    const [showResults, setShowResults] = useState(false);

    const classes = useStyles();

    const getColumns = () => {
        if (isWidthUp('xl', props.width)) {return 5;}
        if (isWidthUp('lg', props.width)) {return 4;}
        if (isWidthUp('md', props.width)) {return 3;}
        if (isWidthUp('sm', props.width)) {return 2;}
        return 1;
    }

    return (
        <Paper className={classes.page} elevation={0}>
            <SearchForm setShowResults={setShowResults}/>
            { showResults &&
            <GroupsList>
                <GridList cellHeight={'auto'} spacing={0}
                          cols={Math.min(Groups.length, getColumns())}>
                    {Groups.map(group => (
                        <GridListTile cols={1}>
                            <GroupProfile group={group} showLinkOrLocation={false} />
                        </GridListTile>
                    ))}
                </GridList>
            </GroupsList>
            }
        </Paper>
    )
}

export default withWidth()(Search);
