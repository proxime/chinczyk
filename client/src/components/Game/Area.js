import React from 'react';
import { useSelector } from 'react-redux';
import dices from './dices';

const Area = ({ number }) => {
    const players = useSelector((state) => state.game.gamePlayers.players);
    const dice = useSelector((state) => state.game.dice);
    const turn = useSelector((state) => state.game.gamePlayers.turn);

    return (
        <div className={`area area-${number}`}>
            <div className="area__nick">
                {players[number] ? players[number].login : '-'}
            </div>
            {dice && players[number] && turn === players[number].key && (
                <div className="area__dice">
                    <img src={dices[dice - 1]} alt={dice} />
                </div>
            )}
            <div className="area__items">
                <div className="area__item">
                    <div className="area__center"></div>
                </div>
                <div className="area__item">
                    <div className="area__center"></div>
                </div>
                <div className="area__item">
                    <div className="area__center"></div>
                </div>
                <div className="area__item">
                    <div className="area__center"></div>
                </div>
            </div>
        </div>
    );
};

export default Area;
