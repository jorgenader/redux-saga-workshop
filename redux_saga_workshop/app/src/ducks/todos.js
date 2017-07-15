import {combineReducers} from 'redux';
import uuid from 'uuid';

const SET_VISIBILITY_FILTER = 'todos/SET_VISIBILITY_FILTER';
const TOGGLE_TODO = 'todos/TOGGLE_TODO';
const CREATE_TODO = 'todos/CREATE_TODO';
const DELETE_TODO = 'todos/DELETE_TODO';


function todos(state = [], action) {
    switch (action.type) {
        case CREATE_TODO:
            return [
                ...state.filter(todo => todo.id !== action.id),
                {id: action.id, text: action.text, completed: action.completed},
            ];

        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.id);

        case TOGGLE_TODO:
            return state.map((todo) => {
                const completed = todo.id === action.id ? !todo.completed : todo.completed;
                return {
                    ...todo,
                    completed,
                };
            });

        default:
            return state;
    }
}

export const VISIBILITY_FILTERS = {
    ALL: 'SHOW_ALL',
    ACTIVE: 'SHOW_ACTIVE',
    COMPLETE: 'SHOW_COMPLETED',
};

function visibilityFilter(state = VISIBILITY_FILTERS.ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;

        default:
            return state;
    }
}

export default combineReducers({
    todos,
    visibilityFilter,
});

export const createTodo = (id, text, completed) => ({type: CREATE_TODO, id, text, completed});
export const deleteTodo = id => ({type: DELETE_TODO, id});
export const toggleTodo = id => ({type: TOGGLE_TODO, id});
export const setVisibilityFilter = filter => ({type: SET_VISIBILITY_FILTER, filter});

export const selectVisibleTodos = (todoList, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return todoList;
        case 'SHOW_COMPLETED':
            return todoList.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todoList.filter(t => !t.completed);

        default:
            return todoList;
    }
};
