import * as types from './types';

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

export function fetchProtein(venomkb_id) {
    return {
        type: types.FETCH_PROTEIN,
        venomkb_id
    };
}
