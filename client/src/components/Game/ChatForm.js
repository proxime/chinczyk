import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../../store/actions/chat';
import socket from '../../utils/socket';

const ChatForm = () => {
    const [msg, setMsg] = useState('');
    const userId = useSelector(state => state.auth.userId);

    const dispatch = useDispatch();

    const handleSendMsg = e => {
        e.preventDefault();
        if (!msg) return;
        socket.emit('chat', msg);
        dispatch(sendMessage(msg, userId));
        setMsg('');
    };

    const sendMessageByEnter = e => {
        if (e.key === 'Enter') {
            handleSendMsg(e);
        }
    };

    return (
        <div className="chat__form">
            <form onSubmit={handleSendMsg} onKeyPress={sendMessageByEnter}>
                <textarea
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                ></textarea>
                <button>Wyślij</button>
            </form>
        </div>
    );
};

export default ChatForm;
