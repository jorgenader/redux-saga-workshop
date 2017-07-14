import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import todos from 'ducks/todos';
import errors from 'ducks/errors';
import counter from 'ducks/counter';

export default combineReducers({
    todos,
    errors,
    counter,
    router: routerReducer,
});
