import React from 'react';
import { useSelector } from 'react-redux';
import socket from '../../utils/socket';

import dice1 from '../../images/dice1.png';
import dice2 from '../../images/dice2.png';
import dice3 from '../../images/dice3.png';
import dice4 from '../../images/dice4.png';
import dice5 from '../../images/dice5.png';
import dice6 from '../../images/dice6.png';

const dices = [dice1, dice2, dice3, dice4, dice5, dice6];

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
