import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import PageError from 'components/PageError';

import {onPageLoad, onPageUnload} from 'actions';

class Page extends React.Component {
    static propTypes = {
        history: PropTypes.shape({
            action: PropTypes.string.isRequired,
        }).isRequired,
        location: PropTypes.shape({
            key: PropTypes.string,
            pathname: PropTypes.string.isRequired,
            search: PropTypes.string.isRequired,
            hash: PropTypes.string.isRequired,
        }).isRequired,
        dispatch: PropTypes.func.isRequired,

        // optional props
        className: PropTypes.string,
        error: PropTypes.shape({
            statusCode: PropTypes.number.isRequired,
            title: PropTypes.string,
            message: PropTypes.string.isRequired,
        }),
        isLoading: PropTypes.bool,
        isLoaded: PropTypes.bool,
        children: PropTypes.node,
    };
    static defaultProps = {
        children: null,
        className: '',
        error: null,
        isLoading: false,
        isLoaded: true,
    };

    static setPageOffset(key, x, y) {
        sessionStorage.setItem(`Page.scrollPositions.${key}.x`, x);
        sessionStorage.setItem(`Page.scrollPositions.${key}.y`, y);
    }

    static getPageOffset(key) {
        const x = sessionStorage.getItem(`Page.scrollPositions.${key}.x`);
        const y = sessionStorage.getItem(`Page.scrollPositions.${key}.y`);

        return [parseInt(x, 10), parseInt(y, 10)];
    }

    componentDidMount() {
        this.props.dispatch(onPageLoad(this.props.location));
        const {history: {action}, location: {key = 'root', pathname, search, hash}} = this.props;
        let scrollToTop = hash.length === 0;

        if (window && window.ga) {
            // Track in Google Analytics
            window.ga('send', 'pageview', `${pathname}${search}`);
        }

        // POP means user is going forward or backward in history, restore previous scroll position
        if (action === 'POP') {
            const pos = Page.getPageOffset(key);
            if (pos) {
                window.scroll(...pos);
                scrollToTop = false;
            }
        }

        if (scrollToTop) {
            // Scroll to top of viewport
            window.scroll(0, 0);
        }
    }

    componentWillUnmount() {
        // Remember scroll position so we can restore if we return to this view via browser history
        const {location: {key = 'root'}, dispatch} = this.props;
        Page.setPageOffset(key, window.pageXOffset, window.pageYOffset);
        dispatch(onPageUnload());
    }

    render() {
        const {className, isLoading, isLoaded, children, error} = this.props;

        if (error) {
            return <PageError {...error} />;
        }

        if (!isLoaded && isLoading) {
            return <div className="loader">Loading...</div>;
        }

        return (
            <div className={className}>
                {children}
            </div>
        );
    }
}

const PageWithRouter = withRouter(Page);

const mapErrorsFromState = state => ({
    error: state.errors,
});

const PageConnector = connect(
    mapErrorsFromState,
)(PageWithRouter);

export default PageConnector;
