import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import TopBar from './TopBar';
import Auth from '../Auth/Auth';
import CreateGame from '../CreateGame/CreateGame';
import GameLobby from '../CreateGame/GameLobby';
import Home from './Home';
import { useSelector } from 'react-redux';

import '../../scss/lobby.scss';

const Lobby = () => {
    const game = useSelector((state) => state.game);
    if (game.inGame && game.gamePlayers && game.gamePlayers.started)
        return <Redirect to="/game" />;

    return (
        <>
            <Auth />
            <TopBar />
            <div className="lobby">
                <Switch>
                    <Route path="/create-game" component={CreateGame} />
                    <Route path="/lobby" component={GameLobby} />
                    <Route path="/" component={Home} />
                </Switch>
            </div>
        </>
    );
};

export default Lobby;
