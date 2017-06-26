import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DataJSONView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentJson: this.props.currentJSON
        };
    }

    render() {
        const formattedJson = JSON.stringify(this.state.currentJson, null, 2);

        return(
            <div className="jumbotron">
                <pre>{formattedJson}</pre>
            </div>
        );
    }
}

DataJSONView.propTypes = {
    currentJSON: PropTypes.object.isRequired
};

export default DataJSONView;
