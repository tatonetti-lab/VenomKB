import React, { PropTypes } from 'react';

const Protein = (props) => {
    const {
        venomkb_id,
        name
    } = props;

    return (
        <div>
            <input type="checkbox" /><h3>{ venomkb_id } { name } </h3>
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
