import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Row, Col} from 'react-bootstrap';
import {Icon} from 'react-fa';

import {triggerIncrease, triggerDecrease, triggerReset} from 'sagas/CounterSaga';


export const Counter = ({counter, onIncrease, onDecrease, onReset}) => (
    <Row>
        <Col md={4} className="text-center">
            <button onClick={onDecrease}>
                <Icon name="minus-square-o" size="2x" />
            </button>
        </Col>
        <Col md={4} className="text-center">{counter}</Col>
        <Col md={4} className="text-center">
            <button onClick={onIncrease}>
                <Icon name="plus-square-o" size="2x" />
            </button>
        </Col>
        <Col md={4} mdOffset={4} className="text-center">
            <button onClick={onReset}>Reset</button>
        </Col>
    </Row>
);

Counter.propTypes = {
    counter: PropTypes.number.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
};

const mapStateToProps = ({counter}) => ({
    counter,
});

const mapDispatchToProps = dispatch => ({
    onIncrease: () => dispatch(triggerIncrease()),
    onDecrease: () => dispatch(triggerDecrease()),
    onReset: () => dispatch(triggerReset()),
});

const CounterConnector = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Counter);

export default CounterConnector;
