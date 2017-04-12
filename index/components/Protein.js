import React, { PropTypes } from 'react';

const Protein = (props) => {
    const {
        _id,
        venomkb_id,
        name
    } = props;

    return (
        <div>
            <h2>{ _id } { venomkb_id } { name } </h2>
        </div>
    );
};

Protein.propTypes = {
    _id: PropTypes.string,
    venomkb_id: PropTypes.string,
    name: PropTypes.string,
    outlinks: PropTypes.object
};


export default Protein;
