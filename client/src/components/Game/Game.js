import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Fields from './Fields';
import Areas from './Areas';
import Chat from './Chat';
import Pawns from './Pawns';
import Dice from './Dice';
import Dissconnect from './Dissconnect';
import { useSelector } from 'react-redux';

import '../../scss/game.scss';

const Game = () => {
    const [isRender, setIsRender] = useState(false);
    const game = useSelector((state) => state.game.gamePlayers);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        setIsRender(true);
    }, []);

    if (!user || !game || (game && !game.started)) {
        return <Redirect to="/" />;
    }

    return (
        <div className="game__container">
            <div className="game">
                <Fields />
                <Areas />
                {isRender && <Pawns />}
                <Dissconnect />
            </div>
            <div className="game__panel">
                <Chat />
                <Dice />
            </div>
        </div>
    );
};

export default Game;
