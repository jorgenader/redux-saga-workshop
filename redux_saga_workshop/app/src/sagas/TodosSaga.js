import {take, put, takeEvery, fork, call} from 'redux-saga/effects';
import uuid from 'uuid';

import {createTodo} from 'ducks/todos';

import {subscribeForStream} from 'sagas/DataProcessingSaga';
import ChannelsSaga, {CONNECTED} from 'sagas/ChannelsSaga';


const ADD_TODO = 'trigger/todos/ADD_TODO';
const DELETE_TODO = 'trigger/todos/DELETE_TODO';

export const triggerAddTodo = text => ({type: ADD_TODO, text});
export const triggerDeleteTodo = id => ({type: DELETE_TODO, id});

function* addTodos() {
    let i = 0;

    while (true) {
        const {text} = yield take(ADD_TODO);
        yield put(createTodo(i, text, false));
        i += 1;
    }
}

export default function* rootSaga() {
    yield fork(ChannelsSaga);

    yield take(CONNECTED);
    yield call(subscribeForStream, 'todos');

    yield fork(addTodos);
}

