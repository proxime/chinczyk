import React, { useRef } from 'react';
import ChatForm from './ChatForm';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const Chat = () => {
    const chat = useSelector((state) => state.chat);
    const chatEl = useRef(null);

    const renderChat = chat.map((msg, index) =>
        msg.type === 'msg' ? (
            <div className="create-game__chat-msg" key={index}>
                <span
                    className="create-game__msg-user"
                    style={{ color: `${msg.color}` }}
                >
                    {msg.nick}:
                </span>
                <span className="create-game__msg-text">{msg.msg}</span>
            </div>
        ) : (
            <div className="create-game__chat-msg" key={index}>
                <div className="create-game__msg-text">{msg.msg}</div>
            </div>
        )
    );

    useEffect(() => {
        chatEl.current.scrollTo(0, chatEl.current.scrollHeight);
    });

    return (
        <div className="game__chat">
            <div className="chat">
                <div className="chat__title">Chat</div>
                <div className="chat__main" ref={chatEl}>
                    {renderChat}
                </div>
                <ChatForm />
            </div>
        </div>
    );
};

export default Chat;
