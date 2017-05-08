import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';

const ProteinDetail = ({ protein }) => {
    return (
        // <div className={`protein protein-detail ${ protein.completed ? 'done' : ''}`}>
        <div>
            <h1>{protein.name}</h1>
            <h3>VenomKB ID: {protein.venomkb_id}</h3>
            <h4>Organism: {protein.venom_ref}</h4>
            <p>
                {protein.description}
            </p>

            <div className="col-xs-12"></div>
            <h4>Sequence:</h4>
            <p>
                {protein.aa_sequence}
            </p>
        </div>
    );
};

ProteinDetail.propTypes = {
    protein: PropTypes.object,
    onRemove: PropTypes.func,
    updateProtein: PropTypes.func,
    router: PropTypes.object
};


export default withRouter(ProteinDetail);
