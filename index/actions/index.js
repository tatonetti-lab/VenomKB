import * as types from './types';
import fetch from 'isomorphic-fetch';

export function filterTable(filter) {
    return {
        type: types.FILTER,
        filter
    };
}

export function selectProtein(venomkb_id) {
    return {
        type: types.SELECT_PROTEIN,
        venomkb_id
    };
}

function requestProtein(venomkb_id) {
    return {
        type: types.REQUEST_PROTEIN,
        venomkb_id
    };
}

function receiveProtein(venomkb_id, json) {
    return {
        type: types.RECEIVE_PROTEIN,
        venomkb_id,
        json,
        receivedAt: Date.now()
    };
}

export function fetchProtein(venomkb_id) {
    return dispatch => {
        dispatch(requestProtein(venomkb_id));
        return fetch(`http://localhost:3001/proteins/${venomkb_id}`)
            .then(response => response.json())
            .then(json => dispatch(receiveProtein(venomkb_id, json[0])));
    };
}
