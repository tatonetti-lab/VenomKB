import fetch from 'isomorphic-fetch';

const envi = (process.env.NODE_ENVIRONMENT === 'PRODUCTION');
const API_BASE = envi ? 'http://34.228.236.46/api/' : 'http://localhost:3001/';

const PROTEINS_URL = API_BASE + 'proteins';
const PROTEINS_IDX_URL = API_BASE + 'proteins/index';
const GENOMES_URL = API_BASE + 'genomess';
const GENOMES_IDX_URL = API_BASE + 'genomess/index';
const SPECIES_URL = API_BASE + 'species';
const SPECIES_IDX_URL = API_BASE + 'species/index';
const DBINDEX_URL = API_BASE + 'dbindexitems';

const jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export async function getDbIndex() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(DBINDEX_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

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

export async function getSpeciesIdx() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(SPECIES_IDX_URL, options);

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

export async function getGenomes() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(GENOMES_URL, options);

        return await response.json();
    } catch(e) {
        throw e;
    }
}

export async function getgenomesIdx() {
    try {
        const options = { mode: 'cors', method: 'GET' };
        const response = await fetch(GENOMES_IDX_URL, options);

        return await response.json();
    } catch (e) {
        throw e;
    }
}
