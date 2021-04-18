import GroupProfile from "./groupDialogComponents/groupProfile";
import styled from "styled-components";
import Groups from "../mockData/groupsMockData"
import {GridList, GridListTile, isWidthUp, withWidth} from "@material-ui/core";

const GroupsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Search = (props) => {

    const getColumns = () => {
        if (isWidthUp('xl', props.width)) {return 5;}
        if (isWidthUp('lg', props.width)) {return 4;}
        if (isWidthUp('md', props.width)) {return 3;}
        if (isWidthUp('sm', props.width)) {return 2;}
        return 1;
    }

    return (
        <>
            <p>this is where the user can search for a group</p>
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
        </>
    )
}

export default withWidth()(Search);