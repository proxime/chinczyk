import React from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';
import dices from './dices';

const Dice = () => {
    const players = useSelector((state) => state.game.gamePlayers.players);
    const turn = useSelector((state) => state.game.gamePlayers.turn);
    const userId = useSelector((state) => state.auth.userId);
    const dice = useSelector((state) => state.game.dice);

    const getPlayerNick = () => {
        const player = players.find((player) => player.key === turn);
        return player.login;
    };
    const nick = getPlayerNick();

    const handleRandomNumber = () => {
        socket.emit('randomNumber');
    };

    return (
        <div className="game__dice">
            {turn === userId ? (
                dice ? (
                    <div className="game__dice-number">
                        <img src={dices[dice - 1]} alt={dice} />
                    </div>
                ) : (
                    <div
                        className="game__dice-strike"
                        onClick={handleRandomNumber}
                    >
                        Rzuć Kostką
                    </div>
                )
            ) : (
                <>
                    <p>Kolejka gracza</p>
                    <h1>{nick}</h1>
                </>
            )}
        </div>
    );
};

export default Dice;
