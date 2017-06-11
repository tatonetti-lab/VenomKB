import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectData, fetchData } from '../actions';
import { Link } from 'react-router';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';

import DataBasicView from '../components/DataBasicView';

class DataDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentVenomkbId: this.props.params.index,
            dataType: this.props.params.index.charAt(0),
            viewType: 'basic'
        };

        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(selectData(this.state.currentVenomkbId));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedData !== prevProps.selectedData) {
            const { dispatch, selectedData } = this.props;
            dispatch(fetchData(selectedData));
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();
        const { dispatch, selectedData } = this.props;
        dispatch(fetchData(selectedData));
    }

    render() {
        const {
            selectedData,
            name,
            common_name,
            out_links,
            aa_sequence,
            description,
            venom_ref,
            venom,
            taxonomic_lineage,
            isFetching,
            species,
            pdb_image_url,
            pdb_structure_known,
            species_image_url,
            literature_predications
         } = this.props;
        return (
            <div>
                <div style={{marginBottom: '5px'}}>
                    <Nav bsStyle="tabs" activeKey="1">
                        <NavItem eventKey="1">Basic view</NavItem>
                        <NavItem eventKey="2">Tabular</NavItem>
                        <NavItem eventKey="3">Class view</NavItem>
                        <NavItem eventKey="4">Download <Glyphicon glyph="download-alt" /></NavItem>
                    </Nav>
                </div>
                <div id="return-link">
                    <Link to={'/data'}>
                        <Glyphicon glyph="triangle-left" />Return to list of proteins
                    </Link>
                </div>

                <div>
                    {isFetching && name === undefined &&
                     <div>
                         <h1>Loading...</h1>
                     </div>
                    }

                    {(!isFetching && !(name === undefined)) &&
                        <div>
                            {(this.state.viewType === 'basic') &&
                            <DataBasicView
                                selectedDatum={selectedData}
                                dataType={this.state.dataType}
                                name={name}
                                common_name={common_name}
                                out_links={out_links}
                                aa_sequence={aa_sequence}
                                description={description}
                                venom_ref={venom_ref}
                                venom={venom}
                                taxonomic_lineage={taxonomic_lineage}
                                isFetching={isFetching}
                                species={species}
                                pdb_image_url={pdb_image_url}
                                pdb_structure_known={pdb_structure_known}
                                species_image_url={species_image_url}
                                predications={literature_predications}
                            />
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

DataDetailContainer.propTypes = {
    selectedData: PropTypes.string.isRequired,
    description: PropTypes.string,
    out_links: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string,
    common_name: PropTypes.string,
    aa_sequence: PropTypes.string,
    venom_ref: PropTypes.string,
    venom: PropTypes.object,
    species: PropTypes.array,
    params: PropTypes.object,
    taxonomic_lineage: PropTypes.array,
    pdb_image_url: PropTypes.string,
    pdb_structure_known: PropTypes.bool,
    species_image_url: PropTypes.string,
    viewType: PropTypes.string,
    literature_predications: PropTypes.array
};


const mapStateToProps = (state) => {
    const { selectedData, currentData } = state.inMemory;
    const { species } = state.resources;
    const {
        isFetching,
        lastUpdated,
        name,
        common_name,
        out_links,
        aa_sequence,
        description,
        venom_ref,
        venom,
        taxonomic_lineage,
        pdb_image_url,
        pdb_structure_known,
        species_image_url,
        literature_predications
    } = currentData || {
        isFetching: true,
        name: '',
        common_name: '',
        out_links: [],
        aa_sequence: '',
        description: '',
        venom_ref: '',
        venom: {},
        taxonomic_lineage: [],
        pdb_image_url: '',
        pdb_structure_known: false,
        species_image_url: '',
        literature_predications: []
    };

    return {
        selectedData,
        out_links,
        aa_sequence,
        isFetching,
        lastUpdated,
        description,
        name,
        common_name,
        venom_ref,
        venom,
        species,
        taxonomic_lineage,
        pdb_image_url,
        pdb_structure_known,
        species_image_url,
        literature_predications
    };
};

export default connect(mapStateToProps)(DataDetailContainer);
