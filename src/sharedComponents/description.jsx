import styled from 'styled-components';

const Text = styled.p`
  text-align: center;
  line-height: 1.5;
  font-size: 1.5rem;
`;

const Description = ({ text }) => {
    return (
        <Text>
            {text}
        </Text>
    )
}

export default Description;