import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ChatForm from './ChatForm';

const Chat = () => {
    const chat = useSelector((state) => state.chat);
    const chatEl = useRef(null);

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

    useEffect(() => {
        chatEl.current.scrollTo(0, chatEl.current.scrollHeight);
    });

    return (
        <div className="create-game__chat">
            <div className="create-game__chat-main" ref={chatEl}>
                {renderChat}
            </div>
            <ChatForm />
        </div>
    );
};

export default Chat;
