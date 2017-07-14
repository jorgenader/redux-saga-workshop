import React from 'react';
import FilterLink from 'containers/FilterLink';

import {VISIBILITY_FILTERS} from 'ducks/todos';


const TodoFilter = () => (
    <p>
        Show:
        {' '}
        <FilterLink filter={VISIBILITY_FILTERS.ALL}>All</FilterLink>
        {' '}
        <FilterLink filter={VISIBILITY_FILTERS.ACTIVE}>Active</FilterLink>
        {' '}
        <FilterLink filter={VISIBILITY_FILTERS.COMPLETE}>Completed</FilterLink>
    </p>
);

export default TodoFilter;
