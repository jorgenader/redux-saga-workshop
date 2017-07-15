import {take, put, takeEvery} from 'redux-saga/effects';

import {createTodo} from 'ducks/todos';


const ADD_TODO = 'trigger/todos/ADD_TODO';
const DELETE_TODO = 'trigger/todos/DELETE_TODO';

export const triggerAddTodo = text => ({type: ADD_TODO, text});
export const triggerDeleteTodo = id => ({type: DELETE_TODO, id});


export default function* rootSaga() {
    // TODO : add creation of todos
}

