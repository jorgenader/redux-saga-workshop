import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Link from 'components/Link';
import {setVisibilityFilter} from 'ducks/todos';

const mapStateToProps = ({todos: state}, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter)),
});

const FilterLink = connect(
    mapStateToProps,
    mapDispatchToProps,
)(Link);

FilterLink.propTypes = {
    filter: PropTypes.string.isRequired,
};

export default FilterLink;
