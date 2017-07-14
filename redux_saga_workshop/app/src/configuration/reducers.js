import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import errors from 'ducks/errors';
import counter from 'ducks/counter';

export default combineReducers({
    errors,
    counter,
    router: routerReducer,
});
