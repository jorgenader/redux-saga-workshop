import React from 'react';
import ReactDOM from 'react-dom';
import Raven from 'raven-js';

import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';
import {AppContainer} from 'react-hot-loader';

import App from 'containers/App';
import configureStore from 'configuration/configureStore';


// Install Raven in production envs
if (process.env.NODE_ENV === 'production') {
    Raven.config(DJ_CONST.RAVEN_PUBLIC_DSN).install(); // eslint-disable-line
    // handle rejected promises
    window.addEventListener('unhandledrejection', (evt) => {
        Raven.captureException(evt.reason);
    });
    // If we have authenticated user, pass its data on to Raven
    if (DJ_CONST.user) {
        Raven.setUserContext({
            id: DJ_CONST.user.id,
            email: DJ_CONST.user.email,
            name: DJ_CONST.user.name,
        });
    }
}

// We want to handle scroll restoration on our own (this only really works in Chrome)
// So sorry Chrome users
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

const {store, history} = configureStore();

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root'));
};

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const RootElement = require('./containers/App').default; // eslint-disable-line
        render(RootElement);
    });
}

function init() {
    render(App);
}

export {init}; // eslint-disable-line import/prefer-default-export
