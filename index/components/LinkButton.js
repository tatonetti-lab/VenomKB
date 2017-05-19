import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { selectProtein, fetchProtein } from '../actions';

class LinkButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linkedId: props.linkedId,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.dispatch(selectProtein(this.props.linkedId));
        this.props.dispatch(fetchProtein(this.props.linkedId));
    }

    render() {
        return (
            <button onClick={this.handleClick}>
                <Link
                    style={{display: 'block', height: '100%'}}
                    to={`/proteins/${this.state.linkedId}`}
                >
                    View
                </Link>
            </button>
        );
    }
}

LinkButton.propTypes = {
    selectedProtein: PropTypes.string.isRequired,
    json: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    linkedId: PropTypes.string
};

const mapStateToProps = (state) => {
    const { selectedProtein, currentProtein } = state.inMemory;
    const {
        isFetching,
        lastUpdated,
        json
    } = currentProtein || {
        isFetching: true,
        json: {}
    };

    return {
        selectedProtein,
        json,
        isFetching,
        lastUpdated
    };
};

export default connect(mapStateToProps)(LinkButton);
