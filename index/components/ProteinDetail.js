import React, { PropTypes } from 'react';
import { withRouter } from 'react-router';
import handleUpdateProtein from '../helpers/handleUpdateProtein';
import withExit from '../helpers/withExit';
import * as rules from '../rules';

const handleSave = (router, nameInput, noteInput, params) => {
    const newName = nameInput.value;
    const newNote = noteInput.value;

    if (!newName || !newNote) return;

    params.push({
        name: newName,
        note: newNote
    });

    withExit(handleUpdateProtein)(router, '/', params);
};

const ProteinDetail = ({ protein, updateProtein, onRemove, router }) => {
    const { name, note, _id, completed, updatedAt } = protein;
    const time = new Date(updatedAt);

    let nameInput;
    let noteInput;

    return (
        <div className={`protein protein-detail ${ completed ? 'done' : ''}`}>
            <form>
                <input
                    type="text"
                    defaultValue={name}
                    maxLength={`${rules.NAME_LENGTH}`}
                    ref={(ref) => { nameInput = ref; }}/>

                <textarea
                    rows="10"
                    cols="50"
                    defaultValue={note}
                    maxLength={`${rules.NOTE_LENGTH}`}
                    ref={(ref) => { noteInput = ref; }}/>
            </form>

            <div>
                <button
                    className="btn-status"
                    onClick={(e) => handleUpdateProtein(e, updateProtein, _id, {
                        completed: !completed
                    })}>

                    Status: { completed ? 'Done' : 'Not Done'}
                </button>
                <span className="datetime">
                    Last Updated: { time.toLocaleString() }
                </span>
            </div>
            <button
                className="btn-save"
                onClick={(e) => handleSave(router, nameInput, noteInput, [e, updateProtein, _id])}>

                SAVE
            </button>
            <span
                className="close-protein"
                onClick={(e) => {
                    e.preventDefault();
                    onRemove(_id);
                    router.push('/');
                }}>

                X
            </span>
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
