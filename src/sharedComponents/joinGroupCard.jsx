import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CreateIcon from "@material-ui/icons/Create";

const CardContainer = styled.a`
  margin: 1rem;
  background-color: white;
  height: 380px;
  flex-basis: 40%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid white;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  :hover, :focus, :active {
    color: #0070f3;
    border-color: #0070f3;
  }
`;

const BlueHighlight = styled.span`
  color: #007aff;
`;

const Description = styled.p`
  margin: 0;
  font-size: 2.25rem;
  line-height: 1.5;
`;

const CardTitle = styled.h3`
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const CardIcon = styled.h2`
  font-size: 2.5rem;
`;

const JoinGroupCard = () => {
    return (
        <CardContainer href="/search">
            <CardIcon>
                <BlueHighlight>
                    <SearchIcon fontSize={'large'}/>
                </BlueHighlight>
            </CardIcon>
            <CardTitle>Find a study group &rarr;</CardTitle>
            <Description>Find a study group <BlueHighlight>by day, hour</BlueHighlight> and topic!</Description>
        </CardContainer>
    )
}

export default JoinGroupCard;