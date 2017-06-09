import React from 'react';
import PropTypes from 'prop-types';
import { DropdownButton, MenuItem } from 'react-bootstrap';

const breakString = (stringToBreak) => {
    const parts = stringToBreak.match(/.{1,10}/g);
    return parts.join(' ');
};

const blastQueryBase = 'https://blast.ncbi.nlm.nih.gov/Blast.cgi?PROGRAM=blastp&PAGE_TYPE=BlastSearch&QUERY=';

class SequenceBox extends React.Component {
    constructor(props) {
        super(props);

        const brokenSequence = breakString(props.aaSequence);

        this.state = {
            brokenSequence,
        };
    }

    render() {
        const blastQueryUrl = blastQueryBase + this.props.aaSequence;
        return (
            <div className="jdr-box">
                <div className="pull-right run-tools-button">
                    <DropdownButton
                        bsSize="xsmall"
                        title="Run tools"
                        id="dropdown-size-extra-small"
                        pullRight
                        onSelect={this.handleToolSelect}
                    >
                        <MenuItem href={blastQueryUrl} target="_blank">BLASTp (NCBI)</MenuItem>
                        <MenuItem eventKey="2">BLAST (PDB)</MenuItem>
                    </DropdownButton>
                </div>
                <h3>Amino Acid Sequence</h3>
                <h4>Number of residues: {this.props.aaSequence.length}</h4>
                <div className="sequence-text">
                    {this.state.brokenSequence}
                </div>
            </div>
        );
    }
}

SequenceBox.propTypes = {
    aaSequence: PropTypes.string
};

export default SequenceBox;
