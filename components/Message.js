import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Message = ({ user, message }) => {
    
    return (
        <MessageBlock sended={message.user === user.uid}>
            <p>{message.message}<br/><span>
                {message.timestamp ?  moment(message.timestamp).calendar(null, {
    sameDay: '[]hh:mm',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'DD/MM/YYYY'
}): '...'}
            </span></p>
        </MessageBlock>
    )
}

export default Message

const MessageBlock = styled.div`
    position: relative;
    display: flex;
    justify-content: ${props => props.sended ? 'flex-end' : 'flex-start'};
    width: 100%;
    margin: 5px 0;

    p {
        position: relative;
        right: 0;
        text-align: ${props => props.sended ? 'rigth' : 'left'};
        max-width: 65%;
        padding: 12px;
        background: ${props => props.sended ? '#dcf8c6' : '#fff'};
        border-radius: 10px;
        font-size: 0.9em;

        :before {
        content: "";
        position: absolute;
        top: 0;
        right: ${props => props.sended ? '-12px;' : 'auto'} -12px;
        left: ${props => props.sended ? 'auto' : '-12px'};
        width: 20px;
        height: 20px;
        background: linear-gradient(
            ${props => props.sended ? '135deg' : '225deg'},
            ${props => props.sended ? '#dcf8c6' : '#fff'},
            ${props => props.sended ? '#dcf8c6' : '#fff'},
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