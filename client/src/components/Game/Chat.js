import React from 'react';
import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';

const Chat = () => {
    const chat = useSelector(state => state.chat);

    const renderChat = chat.map((msg, index) =>
        msg.type === 'msg' ? (
            <div className="create-game__chat-msg" key={index}>
                <div
                    className="create-game__msg-user"
                    style={{ color: `${msg.color}` }}
                >
                    {msg.nick}:
                </div>
                <div className="create-game__msg-text">{msg.msg}</div>
            </div>
        ) : (
            <div className="create-game__chat-msg" key={index}>
                <div className="create-game__msg-text">{msg.msg}</div>
            </div>
        )
    );

    return (
        <div className="game__chat">
            <div className="chat">
                <div className="chat__title">Chat</div>
                <div className="chat__main">{renderChat}</div>
                <ChatForm />
            </div>
        </div>
    );
};

export default Chat;
