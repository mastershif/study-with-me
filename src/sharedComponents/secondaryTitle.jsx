import styled from 'styled-components';

const Title = styled.h1`
  padding-top: 1rem;
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
  @media (max-width: 700px) {
    font-size: 1.75rem;
  }
`;

const SecondaryTitle = ({ text }) => {
    return (
        <Title>
            {text}
        </Title>
    )
}

export default SecondaryTitle;
