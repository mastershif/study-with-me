import styled from 'styled-components';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';

const HeaderContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: flex-end;
`;

const Header = () => {
    return (
        <HeaderContainer>
            <a href="/profile">
                <PersonOutlineIcon fontSize={'large'} />
            </a>
        </HeaderContainer>
    )
}

export default Header;