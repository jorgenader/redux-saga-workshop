import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {triggerAddTodo} from 'sagas/TodosSaga';


class AddTodo extends React.Component {
    static propTypes = {
        onAddTodo: PropTypes.func.isRequired,
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.domInput.value.trim()) {
            return;
        }

        this.props.onAddTodo(this.domInput.value);
        this.domInput.value = '';
    };

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input ref={(node) => { this.domInput = node; }} />
                    <button type="submit">Add Todo</button>
                </form>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    onAddTodo: text => dispatch(triggerAddTodo(text)),
});

const AddTodoConnector = connect(
    null,
    mapDispatchToProps,
)(AddTodo);

export default AddTodoConnector;
