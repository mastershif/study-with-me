import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  font-weight: 500;
  text-align: center;
`;

const MainTitle = ({ textLine1, textLine2 }) => {
    return (
        <Title>
            {textLine1}<br></br>{textLine2}
        </Title>
    )
}

export default MainTitle;