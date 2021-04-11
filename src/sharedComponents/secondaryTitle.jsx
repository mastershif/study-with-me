import styled from 'styled-components';

const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 3rem;
  font-weight: 500;
  text-align: center;
`;

const SecondaryTitle = ({ text }) => {
    return (
        <Title>
            {text}
        </Title>
    )
}

export default SecondaryTitle;
