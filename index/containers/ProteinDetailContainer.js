import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectProtein, fetchProtein } from '../actions';
import { Nav, NavItem, Image, Col } from 'react-bootstrap';

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

    render() {
        const { selectedProtein, json, isFetching } = this.props;
        return (
            <div>
                <Nav bsStyle="tabs" activeKey="1">
                    <NavItem eventKey="1">Basic view</NavItem>
                    <NavItem eventKey="2">Tabular</NavItem>
                    <NavItem eventKey="3">Class view</NavItem>
                    <NavItem eventKey="4">Download</NavItem>
                </Nav>
                <div>
                    {!isFetching &&
                        <div>
                            <Col xs={12} md={12}>
                                <Image className="pull-right" src={"http://www.rcsb.org/pdb/images/5MIM_bio_r_250.jpg"} thumbnail />
                                <h1>{json.name}</h1>
                                <h3>{selectedProtein}</h3>
                                <h4>Organism: {json.venom_ref}</h4>
                                <p>
                                    {json.description}
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </Col>
                            <Col xs={12} md={12}>
                                <h4>Sequence:</h4>
                                <p>
                                    {json.aa_sequence}
                                </p>
                            </Col>
                        </div>
                    }
                    {isFetching && json === undefined &&
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
    json: PropTypes.object.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
};


const mapStateToProps = (state) => {
    const { selectedProtein, currentProtein } = state;
    const {
        isFetching,
        lastUpdated,
        json
    } = currentProtein || {
        isFetching: true,
        json: {}
    };

    return {
        selectedProtein,
        json,
        isFetching,
        lastUpdated
    };
};

export default connect(mapStateToProps)(ProteinDetailContainer);
