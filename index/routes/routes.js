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
import Protein from '../components/Protein';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/about" component={About} />
		<Route path="/contact" component={Contact} />
		<Route path="/publications" component={Publications} />
		<Route path="/data" component={Data} />
		<Route path="/download" component={Download} />
		<Route path="/protein" component={Protein} />
		<Route path="/table" component={FilterableTable} />
	</Route>
);
