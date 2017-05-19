import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProtein, fetchProtein } from '../actions';
import { Nav, NavItem, Image, Col, Glyphicon } from 'react-bootstrap';
import { Link } from 'react-router';

import SequenceBox from '../components/SequenceBox';
import OutLinks from '../components/OutLinks';

class ProteinDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedProtein } = this.props;
        dispatch(fetchProtein(selectedProtein));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedProtein !== prevProps.selectedProtein) {
            const { dispatch, selectedProtein } = this.props;
            dispatch(fetchProtein(selectedProtein));
        }
    }

    handleChange(nextProtein) {
        this.props.dispatch(selectProtein(nextProtein));
        this.props.dispatch(fetchProtein(nextProtein));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedProtein } = this.props;
        dispatch(fetchProtein(selectedProtein));
    }

    speciesName(query_vkbid) {
        const foundSpecies = this.props.species.find((element) => {
            return element.venomkb_id === query_vkbid;
        });
        return foundSpecies.name;
    }

    render() {
        const { selectedProtein, name, out_links, aa_sequence, description, venom_ref, isFetching } = this.props;
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
                    <Link to={'/proteins'}>
                        <Glyphicon glyph="triangle-left" />Return to list of proteins
                    </Link>
                </div>
                <div>
                    {!isFetching &&
                        <div>
                            <Col xs={12} md={12}>
                                <Image className="pull-right" src={"http://www.rcsb.org/pdb/images/5MIM_bio_r_250.jpg"} thumbnail />
                                <h1>{name}</h1>
                                <h3>{selectedProtein}</h3>
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
                    }
                    {isFetching && name === undefined &&
                        <div>
                            <h1>Loading...</h1>
                        </div>
                    }
                </div>
            </div>
        );
    }
}


ProteinDetailContainer.propTypes = {
    selectedProtein: PropTypes.string.isRequired,
    description: PropTypes.string,
    out_links: PropTypes.object,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    name: PropTypes.string,
    aa_sequence: PropTypes.string,
    venom_ref: PropTypes.string,
    species: PropTypes.array
};


const mapStateToProps = (state) => {
    const { selectedProtein, currentProtein } = state.inMemory;
    const { species } = state.resources;
    const {
        isFetching,
        lastUpdated,
        name,
        out_links,
        aa_sequence,
        description,
        venom_ref
    } = currentProtein || {
        isFetching: true,
        name: '',
        out_links: [],
        aa_sequence: '',
        description: '',
        venom_ref: ''
    };

    return {
        selectedProtein,
        out_links,
        aa_sequence,
        isFetching,
        lastUpdated,
        description,
        name,
        venom_ref,
        species
    };
};

export default connect(mapStateToProps)(ProteinDetailContainer);
