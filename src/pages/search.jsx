import GroupProfile from "../sharedComponents/groupProfile";
import styled from "styled-components";

const GroupsList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  width: 100%;
  margin-top: 1.15rem;
`;

const Search = () => {
    return (
        <>
            <p>this is where the user can search for a group</p>
            <GroupsList>
                <GroupProfile />
                <GroupProfile />
                <GroupProfile />
                <GroupProfile />
                <GroupProfile />
            </GroupsList>
        </>
    )
}

export default Search;