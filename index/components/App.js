import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) =>
    <div id="venomkb-app">
        { children }
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
