import React from 'react';
import { useSelector } from 'react-redux';
import dices from './dices';

const Area = ({ number, isTherePlayer, index }) => {
    const players = useSelector((state) => state.game.gamePlayers.players);
    const dice = useSelector((state) => state.game.dice);
    const turn = useSelector((state) => state.game.gamePlayers.turn);

    return (
        <div className={`area area-${number}`}>
            <div className="area__nick">
                {isTherePlayer ? players[index].login : '-'}
            </div>
            {dice && isTherePlayer && turn === players[index].key && (
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
