import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {createLogger} from 'redux-logger';

import rootReducer from 'configuration/reducers';

import SagaManager from 'sagas/SagaManager';

// Enable Redux devTools in development (only when browser is used, ignored when rendered with node)
const composeEnhancers =
    process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const storeEnhancers = [];

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// create list of middleware to spread latter, makes easier way to add based on environment
const middlewares = [sagaMiddleware];

// if not production, add redux logger
if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({
        collapsed: true,
        duration: true,
    }));
}

export default function configureStore() {
    // might contain pre-configured enhancers
    storeEnhancers.unshift(applyMiddleware(...middlewares));
    const store = createStore(rootReducer, composeEnhancers(...storeEnhancers));

    if (typeof window !== 'undefined') {
        // run sagas only on client
        SagaManager.startSagas(sagaMiddleware);
    }

    /* eslint-disable global-require */
    if (module.hot) {
        module.hot.accept(
            './reducers', () => store.replaceReducer(require('./reducers').default),
        );

        module.hot.accept('../sagas/SagaManager', () => {
            SagaManager.cancelSagas(store);
            require('../sagas/SagaManager').default.startSagas(sagaMiddleware);
        });
    }
    /* eslint-enable */

    return store;
}
