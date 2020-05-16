import React from 'react';
import { Route, Switch } from 'react-router-dom';
import TopBar from './TopBar';
import Auth from '../Auth/Auth';
import CreateGame from '../CreateGame/CreateGame';
import GameLobby from '../CreateGame/GameLobby';
import Home from './Home';

import '../../scss/lobby.scss';

const Lobby = () => {
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
