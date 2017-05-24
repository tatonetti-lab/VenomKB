import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProtein, fetchProtein } from '../actions';
import { Link } from 'react-router';
import { Nav, NavItem, Glyphicon } from 'react-bootstrap';

import DataBasicView from '../components/DataBasicView';

class DataDetailContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentProteinId: this.props.params.index
        };

        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentWillMount() {
        console.log('DISPATCHING SELECT_PROTEIN FROM ProteinDetailContainer.componentWillMount()');
        this.props.dispatch(selectProtein(this.state.currentProteinId));
        console.log('DISPATCHING FETCH_PROTEIN FROM ProteinDetailContainer.componentWillMount()');
        this.props.dispatch(fetchProtein(this.state.currentProteinId));
    }

    componentDidUpdate(prevProps) {
        if (this.props.selectedData !== prevProps.selectedData) {
            const { dispatch, selectedData } = this.props;
            dispatch(fetchProtein(selectedData));
        }
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedData } = this.props;
        dispatch(fetchProtein(selectedData));
    }

    render() {
        const {
            selectedData,
            name,
            out_links,
            aa_sequence,
            description,
            venom_ref,
            isFetching,
            species } = this.props;
        console.log('RENDERING... FETCHING: ', isFetching);
        console.log('             NAME UNDEFINED: ', (name === undefined));
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
                     <DataBasicView
                         selectedDatum={selectedData}
                         name={name}
                         out_links={out_links}
                         aa_sequence={aa_sequence}
                         description={description}
                         venom_ref={venom_ref}
                         isFetching={isFetching}
                         species={species}
                     />
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
    aa_sequence: PropTypes.string,
    venom_ref: PropTypes.string,
    species: PropTypes.array,
    params: PropTypes.object
};


const mapStateToProps = (state) => {
    const { selectedData, currentData } = state.inMemory;
    const { species } = state.resources;
    const {
        isFetching,
        lastUpdated,
        name,
        out_links,
        aa_sequence,
        description,
        venom_ref
    } = currentData || {
        isFetching: true,
        name: '',
        out_links: [],
        aa_sequence: '',
        description: '',
        venom_ref: ''
    };

    return {
        selectedData,
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

export default connect(mapStateToProps)(DataDetailContainer);
