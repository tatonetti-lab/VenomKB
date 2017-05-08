import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class LinkButton extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            linkedId: props.linkedId
        };
    }

    render() {
        return (
            <button>
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
    linkedId: PropTypes.string
};

export default (LinkButton);
