import {connect} from 'react-redux';

import TodoList from 'components/TodoList';
import {toggleTodo, selectVisibleTodos} from 'ducks/todos';


const mapStateToProps = state => ({
    todos: selectVisibleTodos(state.todos.todos, state.todos.visibilityFilter),
});


const mapDispatchToProps = dispatch => ({
    onTodoClick: id => dispatch(toggleTodo(id)),
});

const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(TodoList);

export default VisibleTodoList;
