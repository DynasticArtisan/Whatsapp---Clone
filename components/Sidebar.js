import { Avatar, IconButton } from '@material-ui/core'
import { Chat, MoreVert, Search } from '@material-ui/icons'
import React, { useEffect, useReducer, useRef, useState } from 'react'
import styled from 'styled-components'
import * as EmailValidator from 'email-validator'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollection } from 'react-firebase-hooks/firestore'
import ChatBlock from './ChatBlock'
import { getRecipientEmail } from '../utils/getRecipientEmail'

const Sidebar = () => {
    const menuRef = useRef(null)
    const [chatInput, setChatInput] = useState('')
    const [user] = useAuthState(auth)
    
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef)
    const logOut = () => {
        auth.signOut()
    }


    const createChat = async (e) => {
        if(e.key === 'Enter' && chatInput){
            console.log('enter')
            if(EmailValidator.validate(chatInput) && chatInput !== user.email && !isChatAlreadyExist(chatInput)){
                // check if input is user
                db.collection('chats').add({
                    users: [user.email, chatInput]
                })
                setChatInput('')
            }
        }
    }
    const isChatAlreadyExist = (recEmail) => {
        return !!chatsSnapshot?.docs.find(chat => 
            chat.data().users.find(user => user === recEmail)?.length > 0)
    }

    const menuToggle = () => {
        menuRef.current.classList.toggle('show')
    }

    return (
        <>
            <Header>
                <UserAvatar src={user?.photoURL} />
                <IconsContainer>
                    <IconButton>
                        <Chat/>
                    </IconButton>
                    <IconButton onClick={menuToggle}>
                        <MoreVert/>
                    </IconButton>
                </IconsContainer>
                <Menu ref={menuRef} onClick={logOut}>Logout</Menu>

            </Header>
            <SearchBlock>
                <SearchIcon/>
            <SearchInput 
                placeholder="Search or start new chat" 
                value={chatInput}
                onChange={(e)=>setChatInput(e.target.value)}
                onKeyPress={createChat}
            />
            </SearchBlock>
            <Chatlist>
                {chatsSnapshot?.docs.map(chat => (
                    <ChatBlock key={chat.id} id={chat.id} recUser={getRecipientEmail(chat.data().users, user)}/>
                ))}
            </Chatlist>
        </>
    )
}

export default Sidebar

const Header = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    background: #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    z-index:15;
`;
const SearchBlock = styled.div `
    position: relative;
    width: 100%;
    height: 50px;
    background: #f6f6f6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 15px;
`;
const SearchIcon = styled(Search)`
    position: absolute;
    left: 30px;
    top: 14px;
    font-size: 1.2em;
`
const SearchInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background: #fff;
  padding: 6px;
  height: 38px;
  border-radius: 30px;
  font-size: 14px;
  padding-left: 40px;
  ::placeholder{
    color: #bbb;
  }
`;
const UserAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
    cursor: pointer;
`;
const IconsContainer = styled.div`
    display: flex;
`;

const Chatlist = styled.div`
  position: relative;
  height: calc(100% - 50px - 60px);
  overflow-y: auto;
`

const Menu = styled.div`
    cursor: pointer;
    position: absolute;
    bottom: -44px;
    z-index:10;
    right: 0;
    background: #fff;
    color: red;
    padding: 10px 20px;
    width: 120px;
    text-align: right;
    box-shadow: -3px 3px 2px 0px rgba(0, 0, 0, 0.06);
    font-size: 1.2em;
    transition: all 0.2s ease-in-out;
    opacity: 0;

    &.show {
        opacity: 1;
    }

`