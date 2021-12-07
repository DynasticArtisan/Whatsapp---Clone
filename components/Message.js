import React from 'react'
import styled from 'styled-components'
const Message = ({ user, message }) => {
    return (
        <MessageBlock>
            <p>{message.message}<br/><span>{message.timestamp}</span></p>
        </MessageBlock>
    )
}

export default Message

const MessageBlock = styled.div`
    position: relative;
    display: flex;
    width: 100%;
    margin: 5px 0;

    p {
        position: relative;
        right: 0;
        text-align: right;
        max-width: 65%;
        padding: 12px;
        background: #dcf8c6;
        border-radius: 10px;
        font-size: 0.9em;

        :before {
        content: "";
        position: absolute;
        top: 0;
        right: -12px;
        width: 20px;
        height: 20px;
        background: linear-gradient(
            135deg,
            #dcf8c6 0%,
            #dcf8c6 50%,
            transparent 50%,
            transparent
        );
        }
        span {
          display: block;
          margin-top: 5px;
          font-size: 0.85em;
          opacity: 0.5;
        }
    }
`