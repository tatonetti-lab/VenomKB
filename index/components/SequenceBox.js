import React from 'react';
import PropTypes from 'prop-types';

const breakString = (stringToBreak) => {
    const parts = stringToBreak.match(/.{1,10}/g);
    return parts.join(' ');
};

class SequenceBox extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);

        const brokenSequence = breakString(props.aaSequence);

        this.state = {
            brokenSequence
        };
    }

    render() {
        return (
            <div style={{border: '1px solid', margin: '10px', padding: '5px'}}>
                <h4>Amino Acid Sequence</h4>
                {this.state.brokenSequence}
            </div>
        );
    }
}

SequenceBox.propTypes = {
    aaSequence: PropTypes.string
};

export default SequenceBox;
