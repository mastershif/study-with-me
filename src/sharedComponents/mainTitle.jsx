import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
  max-width: 85%;
  @media (max-width: 700px) {
    font-size: 2rem;
  }
`;

const MainTitle = ({ textLine1, textLine2 }) => {
    return (
        <Title>
            {textLine1}<br></br>{textLine2}
        </Title>
    )
}

export default MainTitle;
