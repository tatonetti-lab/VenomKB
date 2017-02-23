import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import { browserHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { AppContainer } from 'react-hot-loader';
// import configureStore from './store/configureStore';
// import Root from './containers/Root';

// const store = configureStore();
// const history = syncHistoryWithStore(browserHistory, store);

const Hello = React.createClass({
    render: function() {
        return <div>Hello world!</div>;
    }
});

render(
    <Hello />,
    document.getElementById('root')
);
