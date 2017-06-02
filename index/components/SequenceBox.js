import React from 'react';
import PropTypes from 'prop-types';

const breakString = (stringToBreak) => {
    const parts = stringToBreak.match(/.{1,10}/g);
    return parts.join(' ');
};

class SequenceBox extends React.Component {
    constructor(props) {
        super(props);

        const brokenSequence = breakString(props.aaSequence);

        this.state = {
            brokenSequence
        };
    }

    render() {
        return (
            <div className="jdr-box">
                <h3>Amino Acid Sequence</h3>
                <h4>Number of residues: {this.props.aaSequence.length}</h4>
                {this.state.brokenSequence}
            </div>
        );
    }
}

SequenceBox.propTypes = {
    aaSequence: PropTypes.string
};

export default SequenceBox;
