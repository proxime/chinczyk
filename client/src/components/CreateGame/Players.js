import React, { useState, useEffect } from 'react';
import Player from './Player';
import { useSelector } from 'react-redux';

const Players = () => {
    const players = useSelector(state => state.game.gamePlayers);
    const [playersEl, setPlayersEl] = useState([]);

    useEffect(() => {
        if (players && players.players) {
            const playersTemp = [];
            const renderPlayers = () => {
                for (let i = 0; i < 4; ++i) {
                    playersTemp.push(
                        <Player key={i} color={i} player={players.players[i]} />
                    );
                }
                setPlayersEl(playersTemp);
            };
            renderPlayers();
        }
    }, [players]);

    return <div className="create-game__players">{playersEl}</div>;
};

export default Players;
