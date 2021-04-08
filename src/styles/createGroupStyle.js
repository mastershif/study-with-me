import styled from "styled-components";
import theme from "../styles/theme";

export const Title = styled.h1`
  margin: 0 0 15px;
  line-height: 3.5rem;
  font-size: xx-large;
  font-weight: bold;
  border-bottom: 1px solid ${theme.palette.primary.main};
`;

export const Label = styled.label`
  line-height: 1.5;
  display: block;
  margin: 20px 5px 0;
  font-size: 18px;
  font-weight: 400;
`;

export const Text = styled.text`
  line-height: 1.5;
  display: block;
  margin: 10px 5px 10px;
  font-size: 14px;
  font-weight: 400;
`;

export const Warning = styled.text`
  line-height: 1.5;
  display: block;
  margin: 5px 5px 5px;
  font-size: 13px;
  font-weight: 500;
  color: ${theme.palette.secondary.main};
`;
