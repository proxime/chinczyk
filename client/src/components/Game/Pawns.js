import React from 'react';
import Pawn from './Pawn';
import { useSelector } from 'react-redux';

const Pawns = () => {
    const players = useSelector(state => state.game.gamePlayers.board);

    const pawns = [];
    for (const i in players) {
        for (const k in players[i].pawns) {
            pawns.push(
                <Pawn
                    key={`${i}${k}`}
                    player={players[i]}
                    number={k}
                    value={players[i].pawns[k]}
                />
            );
        }
    }

    return <div className="pawns">{pawns}</div>;
};

export default Pawns;
