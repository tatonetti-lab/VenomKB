import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './index/store/configureStore';
import Root from './index/containers/Root';

// handle api calls from within app
import { getProteinsIdx, getSpeciesIdx } from './index/helpers/api_fetch';

import './index/styles/venomkb.css';

// Require images so webpack knows to move them to dist
import './index/img/favicons/favicons';

const buildIndex = (proteins, species) => {
    const idx = [];

    // find species that go along with each protein
    for (let i = 0; i < proteins.length; i++) {
        const p = proteins[i];

        const species_ref = p.venom_ref.replace('V', 'S');

        const thisProtSpecies = species.find((specie) => {
            return specie.venomkb_id === species_ref;
        });

        const name = p.name + ' (' + thisProtSpecies.name + ')';
        const thisprot = {
            name: name,
            venomkb_id: p.venomkb_id,
            data_type: 'Protein'
        };
        idx.push(thisprot);
    }

    // add the species
    for (let i = 0; i < species.length; i++) {
        const s = species[i];

        const thisspec = {
            name: s.name,
            venomkb_id: s.venomkb_id,
            data_type: 'Species'
        };
        idx.push(thisspec);
    }

    return idx;
};

getProteinsIdx().then((proteins) => {
    getSpeciesIdx().then((species) => {
        const index = buildIndex(proteins, species);

        const store = configureStore({
            resources: {
                proteins,
                species,
                index
            }
        });
        const history = syncHistoryWithStore(browserHistory, store);

        render(
            <AppContainer>
                <Root store={store} history={history} />
            </AppContainer>,
            document.getElementById('venomkb_root')
        );

        if (module.hot) {
            module.hot.accept('./index/containers/Root', () => {
                const NewRoot = require('./index/containers/Root').default;
                render(
                    <AppContainer>
                        <NewRoot store={store} history={history} />
                    </AppContainer>,
                    document.getElementById('venomkb_root')
                );
            });
        }
    });
});
