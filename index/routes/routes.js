import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import FilterableTable from '../containers/FilterableTable';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Publications from '../components/Publications';
import Data from '../components/Data';
import Download from '../components/Download';

import ProteinsContainer from '../containers/ProteinsContainer';
import ProteinDetailContainer from '../containers/ProteinDetailContainer';


export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path="/contact" component={Contact} />
		<Route path="/publications" component={Publications} />
		<Route path="/data" component={Data} />
		<Route path="/download" component={Download} />
		<Route path="/proteins" component={ProteinsContainer} />
		<Route path="/proteins/:index" component={ProteinDetailContainer} />
		<Route path="/table" component={FilterableTable} />
	</Route>
);
