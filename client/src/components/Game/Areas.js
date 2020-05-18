import React from 'react';
import { useSelector } from 'react-redux';
import Area from './Area';

const Areas = () => {
    const board = useSelector((state) => state.game.gamePlayers.board);

    const areas = [];
    const render = () => {
        let k = -1;
        for (let i = 0; i < 4; ++i) {
            let isTherePlayer = false;
            for (const key in board) {
                if (board[key].number === i) {
                    k++;
                    isTherePlayer = true;
                }
            }
            areas.push(
                <Area
                    key={i}
                    number={i}
                    isTherePlayer={isTherePlayer}
                    index={k}
                />
            );
        }
    };
    render();

    return <div className="areas">{areas}</div>;
};

export default Areas;
