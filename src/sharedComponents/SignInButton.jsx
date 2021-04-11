import React from 'react';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const InButton = styled(Button)({
    background: 'white',
    border: '1px solid black',
    borderRadius: 3,
    color: 'black',
    height: 48,
    padding: '0 30px',
    margin: '4px'
  });
  

export default function SignInButton() {
    return (
        <InButton href="/signIn">
            התחברות
        </InButton>
    )
}
