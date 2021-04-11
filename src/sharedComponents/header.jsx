import styled from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import SignInButton from "./SignInButton";
import SignUpButton from "./SignUpButton";
import React from "react";
import theme from "../styles/theme";

const HeaderContainer = styled.div`
  width: 99vw;
  margin-top: 0.25em;
  margin-bottom: 0.25em;
  padding-left: 1em;
  padding-right: 1em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const Logo = styled.a`
  color: ${theme.palette.secondary.main};
  line-height: 1.15;
  font-size: 3rem;
  font-weight: 500;
  font-style: italic;
  text-decoration: none;
`;

const ProfileIconContainer = styled.a`
  margin: 4px;
  font-size: 3rem;
  text-decoration: none;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <Logo href="/">Study With Me</Logo>
            <ButtonsContainer>
                <SignUpButton />
                <SignInButton />
                <ProfileIconContainer href="/profile">
                    <PersonOutlineIcon fontSize={'inherit'} />
                </ProfileIconContainer>
            </ButtonsContainer>
        </HeaderContainer>
    )
}

export default Header;
