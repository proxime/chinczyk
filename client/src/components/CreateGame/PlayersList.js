import React from 'react';
import { useSelector } from 'react-redux';
import PlayerItem from './PlayerItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateRight } from '@fortawesome/free-solid-svg-icons';

import socket from '../../utils/socket';

const PlayersList = () => {
    const players = useSelector((state) => state.game.players);

    const renderPlayers = players.map((player) => (
        <PlayerItem
            key={player.socket}
            name={player.login}
            id={player.socket}
        />
    ));

    const resfreshPlayers = () => {
        socket.emit('refreshPlayersList');
    };

    return (
        <div className="players__list">
            <div className="create-game__buttons">
                <div className="create-game__refresh" onClick={resfreshPlayers}>
                    <FontAwesomeIcon icon={faRotateRight} />
                </div>
            </div>
            {renderPlayers}
        </div>
    );
};

export default PlayersList;
