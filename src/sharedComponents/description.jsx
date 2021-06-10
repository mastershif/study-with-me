import styled from 'styled-components';

const Text = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  line-height: 1.5;
  font-size: 2rem;
  max-width: 85%;
  @media (max-width: 700px) {
    font-size: 1.25rem;
  }
`;

const Description = ({ text }) => {
    return (
        <Text>
            {text}
        </Text>
    )
}

export default Description;
