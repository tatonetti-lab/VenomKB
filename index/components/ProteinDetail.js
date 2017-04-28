import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
// import handleUpdateProtein from '../helpers/handleUpdateProtein';
// import withExit from '../helpers/withExit';

/* const handleSave = (router, nameInput, noteInput, params) => {
    const newName = nameInput.value;
    const newNote = noteInput.value;

    if (!newName || !newNote) return;

    params.push({
        name: newName,
        note: newNote
    });

    withExit(handleUpdateProtein)(router, '/', params);
};*/

const ProteinDetail = ({ protein }) => {
    console.log('Protein: ', protein);

    return (
        <div className={`protein protein-detail ${ protein.completed ? 'done' : ''}`}>
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
