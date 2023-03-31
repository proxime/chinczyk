import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Alert from './components/Alert';
import { Provider } from 'react-redux';
import store from './store/store';
import initApp from './initApp';

import './scss/index.scss';

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                {initApp(store)}
                <Alert />
                <div className="App">
                    <Routes />
                </div>
            </Router>
        </Provider>
    );
};

export default App;
