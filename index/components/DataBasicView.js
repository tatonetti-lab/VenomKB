import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Col } from 'react-bootstrap';

import SequenceBox from '../components/SequenceBox';
import OutLinks from '../components/OutLinks';

class DataBasicView extends Component {
    constructor(props) {
        super(props);

        const dataType = this.props.selectedDatum.charAt(0);

        this.state = {
            'data_type': dataType
        };
    }

    speciesName(query_vkbid) {
        const foundSpecies = this.props.species.find((element) => {
            return element.venomkb_id === query_vkbid;
        });
        return foundSpecies.name;
    }

    render() {
        const {
            selectedDatum,
            name,
            out_links,
            aa_sequence,
            description,
            venom_ref,
        } = this.props;

        switch (this.state.data_type) {
            case 'P':
                return (
                    <div>
                        <Col xs={12} md={12}>
                            <Image className="pull-right" src={"http://www.rcsb.org/pdb/images/5MIM_bio_r_250.jpg"} thumbnail />
                            <h1>{name}</h1>
                            <h3>{selectedDatum}</h3>
                            <h4>Organism: {venom_ref.replace('V', 'S')} ({this.speciesName(venom_ref.replace('V', 'S'))})</h4>
                            <p>
                                {description}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </Col>

                        {!(name === undefined) &&
                        <div>
                            <Col xs={12} md={12}>
                                <SequenceBox
                                    aaSequence={aa_sequence}
                                />
                            </Col>

                            <Col xs={12} md={12}>
                                <h3>External databases</h3>
                                <OutLinks links={out_links} />
                            </Col>
                        </div>
                        }
                    </div>
                );
            case 'S':
                return (
                    <div>
                        TODO - Species
                    </div>
                );
            default:
                return (
                    <div>
                        ERROR! Invalid data type.
                    </div>
                );
        }
    }
}

DataBasicView.propTypes = {
    selectedDatum: PropTypes.string.isRequired,
    description: PropTypes.string,
    out_links: PropTypes.object,
    name: PropTypes.string.isRequired,
    aa_sequence: PropTypes.string,
    venom_ref: PropTypes.string,
    species: PropTypes.array
};

export default DataBasicView;
