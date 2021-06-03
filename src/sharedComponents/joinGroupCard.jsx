import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';

const CardContainer = styled.a`
  margin: 1rem;
  background-color: white;
  height: 350px;
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
  @media (max-width: 835px) {
    min-width: 80%;
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
            <CardTitle> למצוא קבוצת לימוד &larr;</CardTitle>
            <Description>מצאו קבוצת לימוד<BlueHighlight> לפי יום, שעה</BlueHighlight> או נושא!</Description>
        </CardContainer>
    )
}

export default JoinGroupCard;
