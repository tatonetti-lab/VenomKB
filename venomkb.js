import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import configureStore from './index/store/configureStore';
import Root from './index/containers/Root';

// handle api calls from within app
import { getProteinsIdx } from './index/helpers/api_fetch';

getProteinsIdx().then((proteins) => {
    const store = configureStore({proteins});
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
