import React, { useRef, useState } from 'react'
import { auth, db } from '../firebase'
import styled from 'styled-components'
import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert } from '@material-ui/icons'
import { useRouter } from 'next/router'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'
import firebase from 'firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { getRecipientEmail } from '../utils/getRecipientEmail'
import TimeAgo from 'timeago-react'
const ChatScreen = ({ chat, messages }) => {
    const router = useRouter()
    const [user] = useAuthState(auth)
    const recipEmail = getRecipientEmail(chat.users, user)
    const [recipSnapshot] = useCollection(db.collection('users').where('email','==', getRecipientEmail(chat.users, user)))
    const [newMessageInput, setNewMessageInput] = useState('')
    const [messagesSnapshot] = useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp', 'asc'))
    const recipient = recipSnapshot?.docs?.[0]?.data()
    const endOfMessageRef = useRef(null)
    const showMessages = () => {
        if(messagesSnapshot){
            return messagesSnapshot.docs.map(mess => (
                <Message
                    key={mess.id}
                    user={user}
                    message={{
                        ...mess.data(),
                        timestamp: mess.data().timestamp?.toDate().getTime()
                    }}
                 />
            ))
        } else {
            return JSON.parse(messages).map(mess => (
                <Message
                key={mess.id}
                user={user}
                message={mess}
             />
            ))
        }
    }

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge : true });
        
        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: newMessageInput,
            user: user.uid
        });
        setNewMessageInput('');
        scrollToBottom()
    }

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }

    return (
        <>
            <Header>
                {
                    recipient ?
                    <UserAvatar src={recipient.photoURL}/> :
                    <UserAvatar>{recipEmail[0]}</UserAvatar>
                }
                <div className="info">
                    <h4>{recipEmail}<br/>
                    { 
                        recipSnapshot ?
                        <span>Last seen: {
                            recipient?.lastSeen?.toDate() ?
                            <TimeAgo minInterval={30} datetime={recipient?.lastSeen?.toDate()}/> :
                            'unavailable'
                            }</span> :
                        <span>Loading...</span>
                    }
                    </h4>
                </div>
                <div className="icons">
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </Header>

            <ChatBox>
                {showMessages()}

                <EndOfMessage ref={endOfMessageRef}/>
            </ChatBox>

            <ChatInputs>
                <IconButton>
                    <InsertEmoticon/>
                </IconButton>
                <IconButton>
                    <AttachFile/>
                </IconButton>
                <input type="text"
                    placeholder="Type a message"
                    value={newMessageInput}
                    onChange={e => setNewMessageInput(e.target.value)}
                    />
                <IconButton>
                    <Mic/>
                </IconButton>
                <button hidden disabled={!newMessageInput} onClick={sendMessage}>Send message</button>
            </ChatInputs>

        </>
    )
}

export default ChatScreen



const Header = styled.div`
    position: relative;
    width: 100%;
    height: 60px;
    background: #ededed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;

    .info {
        flex-grow: 1;

        h4 {
            font-weight: 500;
            line-height: 1.2em;
            margin-left: 15px;
        
            span {
                font-size: 0.8em;
                color: #555;
            }
        }
    }
`

const UserAvatar = styled(Avatar)`
    width: 40px;
    height: 40px;
    cursor: pointer;
`;

const ChatBox = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 120px);
  padding: 50px;
  overflow-y: auto;
  `

const EndOfMessage = styled.div`
margin-bottom: 50px
`;

const ChatInputs = styled.form`
    position: relative;
    width: 100%;
    height: 60px;
    background: #f0f0f0;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    input {
        position: relative;
        width: 90%;
        margin: 0 20px;
        padding: 10px 20px;
        border: none;
        outline: none;
        border-radius: 30px;
        font-size: 1em;
    }


`

