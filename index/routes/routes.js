import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Publications from '../components/Publications';
import Download from '../components/Download';
import NotFound from '../components/NotFound';

import DataContainer from '../containers/DataContainer';
import DataDetailContainer from '../containers/DataDetailContainer';


export default (
    <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/publications" component={Publications} />
        <Route path="/data" component={DataContainer} />
        <Route path="/download" component={Download} />
        <Route path="/:index" component={DataDetailContainer} />
        <Route path="*" component={NotFound} />
    </Route>
);
