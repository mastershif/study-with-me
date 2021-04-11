import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const InButton = styled(Button)({
    background: 'white',
    position: 'absolute',
    left: 132,
    top: 0,
    border: '1px solid black',
    borderRadius: 3,
    color: 'black',
    height: 48,
    padding: '0 30px',
  });
  

  export default function StyledComponents() {
    return (
        <InButton href="/signIn">
            להתחברות
        </InButton>
    )
}
