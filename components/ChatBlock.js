import { Avatar } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import styled from 'styled-components'
import { db } from '../firebase'


const ChatBlock = ({id, recUser}) => {
    const router = useRouter()
    const [recSnapshot] = useCollection(db.collection('users').where('email', '==', recUser))
    const recipient = recSnapshot?.docs?.[0]?.data()
    return (
        <Block onClick={()=>router.push(`/chat/${id}`)}>
            { recipient ? <UserAvatar src={recipient.photoURL}/> : <UserAvatar>{recUser[0]}</UserAvatar> }
            <Details>
                <h4>{recUser}</h4>
                <p>21.27</p>
            </Details>
        </Block>
    )
}

export default ChatBlock

const Block = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  cursor: pointer;
  :hover {
    background: #f5f5f5;
  }
`
const UserAvatar = styled(Avatar)`
  margin-right: 10px;
`
const Details = styled.div`
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
        font-size: 1.1em;
        font-weight: 600;
        color: #111;
    }
    p {
        font-size: 0.75em;
        color: #aaa;
    }
`
