import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';

import {setError} from 'ducks/errors';

class PageError extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        statusCode: PropTypes.number,
        message: PropTypes.string,

        // redux action for reset
        clearError: PropTypes.func.isRequired,
    };

    static defaultProps = {
        statusCode: 400,
        title: 'Error',
        message: 'The server encountered an internal error and was unable to complete your request.',
    };

    componentWillUnmount() {
        this.props.clearError();
    }

    render() {
        const {title, message, statusCode} = this.props;
        return (
            <div className="container">
                <div key={statusCode} className="page-error-wrapper">
                    <Helmet title={title} />
                    <div className="panel panel-shadow panel-message">
                        <h1>{title}</h1>
                        <p className="text-muted">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(setError(null)),
});

const PageErrorConnector = connect(
    null,
    mapDispatchToProps,
)(PageError);


export default PageErrorConnector;
