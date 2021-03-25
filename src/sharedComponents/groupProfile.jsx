import styled from "styled-components";

const GroupCardContainer = styled.li`
  max-width: 680px;
  margin: 1rem;
  background-color: white;
  height: 280px;
  flex-basis: 40%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
`;

const GroupProfile = () => {
    return (
        <GroupCardContainer>
            this is a group profile
        </GroupCardContainer>
    )
}

export default GroupProfile;