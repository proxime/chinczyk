import React, { useState } from 'react';
import RingSpinner from '../RingSpinner';
import socket from '../../utils/socket';

const PlayerItem = ({ name, id }) => {
    const [isInvited, setIsInvited] = useState(false);

    const inviteToGame = () => {
        if (!isInvited) {
            socket.emit('invitePlayer', id);
            setIsInvited(true);
        }
    };

    return (
        <div className="player-item">
            <div className="player-item__name">{name}</div>
            {!isInvited ? (
                <div className="player-item__button" onClick={inviteToGame}>
                    Zaproś
                </div>
            ) : (
                <RingSpinner size={30} />
            )}
        </div>
    );
};

export default PlayerItem;
