import styled from 'styled-components';
import Head from 'next/head'
import React from 'react'
import { Button } from '@material-ui/core';
import {auth, provider} from '../firebase'
import { signInWithPopup } from '@firebase/auth';

const Login = () => {
    const sigIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Container>
                    <Logo src='https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2042px-WhatsApp.svg.png'/>
                    <Button variant='outlined' onClick={sigIn}>Sign In With Google</Button>
            </Container>
        </>
    )
}

export default Login

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 100vw;
  background: #fff;
  padding: 100px;
  border-radius: 20px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.06), 0 2px 5px 0 rgba(0, 0, 0, 0.06);
`



const Logo = styled.img`
    width: 200px;
    display: block;
    margin-bottom: 50px;
`