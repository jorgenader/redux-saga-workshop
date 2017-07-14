import React from 'react';
import {Row} from 'react-bootstrap';

import withPage from 'decorators/withPage';

import TodoFilter from 'components/TodoFilter';
import AddTodo from 'containers/AddTodo';
import VisibleTodoList from 'containers/VisibleTodoList';


const Todos = () => (
    <div className="page-container">
        <Row>
            <AddTodo />
            <TodoFilter />
            <VisibleTodoList />
        </Row>
    </div>
);

const TodoListAsPage = withPage(Todos);

export default TodoListAsPage;
