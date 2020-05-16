import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Menu from './Menu';
import { useSelector } from 'react-redux';

const Home = ({ history }) => {
    const game = useSelector((state) => state.game);
    const userId = useSelector((state) => state.auth.userId);

    useEffect(() => {
        if (
            game.inGame &&
            game.gamePlayers &&
            !game.gamePlayers.started &&
            game.gamePlayers.creator !== userId &&
            history.location.pathname !== '/lobby'
        ) {
            history.push('/lobby');
        }
    });

    if (game.inGame && game.gamePlayers && game.gamePlayers.started)
        return <Redirect to="/game" />;

    return <Menu />;
};

export default withRouter(Home);
