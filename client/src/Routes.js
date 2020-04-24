import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Lobby from './components/Lobby/Lobby';
import Game from './components/Game/Game';

const Routes = () => {
    return (
        <Switch>
            <Route path="/game" exact component={Game} />
            <Route path="/" component={Lobby} />
        </Switch>
    );
};

export default Routes;
