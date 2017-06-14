import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router';
import SequenceBox from '../components/SequenceBox';
import OutLinks from '../components/OutLinks';
import { connect } from 'react-redux';
import { selectData, fetchData } from '../actions';
import ReactTooltip from 'react-tooltip';

import VenomDetail from '../components/VenomDetail.js';
import TaxonomyDetail from '../components/TaxonomyDetail.js';
import ProteinImage from '../components/ProteinImage.js';
import SpeciesImage from '../components/SpeciesImage.js';
import PredicationsBox from '../components/PredicationsBox';

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
            pdb_structure_known,
            species_image_url,
            predications
        } = this.props;

        const common_name = this.props.common_name;
        const dataType = this.props.selectedDatum.charAt(0);

        switch (dataType) {
            case 'P':
                const species_link = '/' + (venom_ref.replace('V', 'S'));

                return (
                    <div>
                        <Col xs={12} md={9} style={{'marginBottom': '50px'}}>
                            <h1>{name}</h1>
                            Annotation score: <img
                                src={'/5_star.png'}
                                style={{
                                    'height': '15px',
                                    'position': 'relative',
                                    'top': '-3px',
                                    'margin-right': '3px'
                                }}
                            /><span
                                className="glyphicon glyphicon-info-sign"
                                data-tip="1-5 scale - represents the completeness of this data item"
                            />
                            <ReactTooltip />
                            <h3>ID: {selectedDatum}</h3>
                            <h4>
                                Organism: <Link to={species_link} onClick={this.loadSpeciesFromProtein}>({this.speciesName(venom_ref.replace('V', 'S'))}) ({venom_ref.replace('V', 'S')})</Link>
                            </h4>
                            <p>
                                {description}
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
                                    fastaLabel={selectedDatum + ': ' + name + ' (' + this.speciesName(venom_ref.replace('V', 'S')) + ')'}
                                />
                            </Col>

                            <Col xs={12} md={12}>
                                <h3>Gene Ontology annotations</h3>
                            </Col>

                            <Col xs={12} md={12}>
                                <h3>Related publications</h3>
                            </Col>

                            <Col xs={12} md={12}>
                                <PredicationsBox
                                    predications={predications}
                                />
                            </Col>

                            <div
                                style={{'marginTop': '12px'}}
                            />

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
                        <Col xs={12} md={7}>
                            {/* <Image className="pull-right" src={"https://www.itsnature.org/wp-content/uploads/2010/06/Bothrops-atrox-2.jpg"} thumbnail /> */}
                            <h1>{name}</h1>
                            Annotation score: <img
                                src={'/5_star.png'}
                                style={{
                                    'height': '15px',
                                    'position': 'relative',
                                    'top': '-3px',
                                    'margin-right': '3px'
                                }}
                            /><span
                                className="glyphicon glyphicon-info-sign"
                                data-tip="1-5 scale - represents the completeness of this data item"
                            />
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
                        </Col>

                        <Col xs={6} md={5}>
                            <SpeciesImage
                                species_image_url={species_image_url}
                            />
                        </Col>

                        <Col xs={12} md={12}>
                            <VenomDetail
                                venom={venom}
                                onProteinClick={this.loadProteinFromSpecies.bind(this)}
                            />
                        </Col>

                        <Col xs={12} md={12}>
                                <PredicationsBox
                                    predications={predications}
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
    pdb_structure_known: PropTypes.bool,
    species_image_url: PropTypes.string,
    predications: PropTypes.array
};

const mapStateToProps = (state) => {
    const { selectedData, currentData } = state.inMemory;
    return {
        selectedData,
        currentData
    };
};

export default connect(mapStateToProps)(DataBasicView);
