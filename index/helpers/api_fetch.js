import fetch from 'isomorphic-fetch';

const PROTEINS_URL = 'http://localhost:3001/proteins';
const PROTEINS_IDX_URL = 'http://localhost:3001/proteins/index';
const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const SPECIES_URL = 'http://localhost:3001/species';

export async function getProteins() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(PROTEINS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function getProteinsIdx() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(PROTEINS_IDX_URL, options);

        return await response.json();
    } catch (e) {
        throw e;
    }
}

export async function getProtein(venomkb_id) {
    try {
        // TODO: Validate venomkb_id
        const options = { mode: 'cors', method: 'GET' };
        const url = PROTEINS_URL + '/' + venomkb_id;
        const response = await fetch(url, options);

        return await response.json();
    } catch (e) {
        throw e;
    }
}

export async function getSpecies(venomkb_id) {
    try {
        // TODO: Validate venomkb_id
        const options = { mode: 'cors', method: 'GET' };
        const url = SPECIES_URL + '/' + venomkb_id;
        const response = await fetch(url, options);

        return await response.json();
    } catch (e) {
        throw e;
    }
}

export async function postProtein(protein) {
    try {
        const options = {
            mode: 'cors',
            method: 'POST',
            headers: jsonHeaders,
            body: JSON.stringify(protein)
        };

        const response = await fetch(PROTEINS_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function putProtein(id, update) {
    try {
        const options = {
            mode: 'cors',
            method: 'PUT',
            headers: jsonHeaders,
            body: JSON.stringify(update)
        };

        const response = await fetch(`${ PROTEINS_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function deleteProtein(id) {
    try {
        const options = {
            mode: 'cors',
            method: 'DELETE',
            headers: jsonHeaders
        };

        const response = await fetch(`${ PROTEINS_URL }/${id}`, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}
