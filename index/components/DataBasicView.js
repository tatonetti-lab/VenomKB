import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, Col } from 'react-bootstrap';
import { Link } from 'react-router';
import SequenceBox from '../components/SequenceBox';
import OutLinks from '../components/OutLinks';
import { connect } from 'react-redux';
import { selectData, fetchData } from '../actions';

import VenomDetail from '../components/VenomDetail.js';
import TaxonomyDetail from '../components/TaxonomyDetail.js';
import ProteinImage from '../components/ProteinImage.js';

class DataBasicView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dataType: props.dataType
        };

        this.loadSpeciesFromProtein = this.loadSpeciesFromProtein.bind(this);
    }

    speciesName(query_vkbid) {
        const foundSpecies = this.props.species.find((element) => {
            return element.venomkb_id === query_vkbid;
        });
        return foundSpecies.name;
    }

    loadSpeciesFromProtein() {
        const { venom_ref } = this.props;
        this.props.dispatch(selectData(venom_ref.replace('V', 'S')));
        this.props.dispatch(fetchData(venom_ref.replace('V', 'S')));
    }

    loadProteinFromSpecies(e) {
        this.props.dispatch(selectData(e));
        this.props.dispatch(fetchData(e));
    }

    render() {
        const {
            selectedDatum,
            name,
            out_links,
            aa_sequence,
            description,
            venom_ref,
            venom,
            taxonomic_lineage,
            pdb_image_url,
            pdb_structure_known
        } = this.props;

        const common_name = this.props.common_name;
        const dataType = this.props.selectedDatum.charAt(0);

        switch (dataType) {
            case 'P':
                const species_link = '/' + (venom_ref.replace('V', 'S'));

                return (
                    <div>
                        <Col xs={12} md={9} style={{'margin-bottom': '50px'}}>
                            <h1>{name}</h1>
                            <h3>ID: {selectedDatum}</h3>
                            <h4>
                                Organism: <Link to={species_link} onClick={this.loadSpeciesFromProtein}>({this.speciesName(venom_ref.replace('V', 'S'))}) ({venom_ref.replace('V', 'S')})</Link>
                            </h4>
                            <p>
                                {description}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </Col>

                        <Col xs={6} md={3}>
                            <ProteinImage
                                pdb_image_url={pdb_image_url}
                                structure_known={pdb_structure_known}
                            />
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
                        <Col xs={12} md={12}>
                            <Image className="pull-right" src={"https://www.itsnature.org/wp-content/uploads/2010/06/Bothrops-atrox-2.jpg"} thumbnail />
                            <h1>{name}</h1>
                            <h3>ID: {selectedDatum}</h3>
                            <h4>Common name: {common_name}</h4>

                            <h3>Taxonomy</h3>
                            {(taxonomic_lineage !== undefined) &&
                                <TaxonomyDetail
                                    taxonomic_lineage={taxonomic_lineage}
                                />
                            }
                            {(taxonomic_lineage === undefined) &&
                                <div>
                                    No data available!
                                </div>
                            }

                            <VenomDetail
                                venom={venom}
                                onProteinClick={this.loadProteinFromSpecies.bind(this)}
                            />
                        </Col>
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
    common_name: PropTypes.string,
    dataType: PropTypes.string.isRequired,
    description: PropTypes.string,
    out_links: PropTypes.object,
    name: PropTypes.string.isRequired,
    aa_sequence: PropTypes.string,
    venom_ref: PropTypes.string,
    venom: PropTypes.object,
    taxonomic_lineage: PropTypes.array,
    species: PropTypes.array,
    dispatch: PropTypes.func.isRequired,
    pdb_image_url: PropTypes.string,
    pdb_structure_known: PropTypes.bool
};

const mapStateToProps = (state) => {
    const { selectedData, currentData } = state.inMemory;
    return {
        selectedData,
        currentData
    };
};

export default connect(mapStateToProps)(DataBasicView);
