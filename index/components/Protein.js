import React from 'react';
import http from 'http';

// can change the PATH as needed
const venomkbApiOptions = {
    host: 'localhost',
    port: '3001',
    path: '/proteins/P000000007',
    method: 'GET'
};

const testProtein = [
    {
        venomkb_id: 'P000000007',
        name: 'Mu-conotoxin GVIIJ',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        organism: {
            scientific_name: 'Conus geographicus',
            common_name: 'Geography cone'
        },
        sequence: 'MKLTCVVIVA ALLLTACQLI TALDCGGTQK HRALRSTIKL SLLRQHRGWC GDPGATCGKL RLYCCSGFCD CYTKTCKDKS SA',
        molecular_effects: [],
        systemic_effects: [],
        go_annotations: [],
        external_links: [],
        history: {
            date_created: '2017-03-03',
            last_updated: '2017-03-03'
        }
    }
];

// NOTE: You need to define this as an empty list! I don't know why.
// If you leave it unassigned, it will error when you try to render the page.
let testProtein2 = [];

http.request(venomkbApiOptions, (res) => {
    res.setEncoding('utf8');
    res.on('data', (data) => {
        testProtein2 = JSON.parse(data);
    });
}).end();

const Protein = () =>
    <div>
        <h2>TEST: {testProtein2.name}</h2>
        <h1>Protein</h1>
        <ul className="nav nav-tabs">
            <li className="active"><a href="#">Basic view</a></li>
            <li><a href="#">Tabular</a></li>
            <li><a href="#">Class view</a></li>
            <li><a href="#">Download <span className="glyphicon glyphicon-download-alt"></span></a></li>
        </ul>
        <img src="http://www.rcsb.org/pdb/images/2N8H_asym_r_250.jpg" className="pull-right float:right" />
        <h2>{testProtein[0].name}</h2>
        <h3>VenomKB ID: {testProtein[0].venomkb_id}</h3>
        <h4>Organism: <a href="#"><i>{testProtein[0].organism.scientific_name}</i> ({testProtein[0].organism.common_name})</a></h4>
        <p>{testProtein[0].description}</p>

        <div className="col-xs-12" style={{height: 20 + 'px'}}></div>
        <div>
            <h4>Sequence:</h4>
            <p>{testProtein[0].sequence}</p>
        </div>

        <h3>Molecular effects</h3>

        <h3>Systemic effects</h3>

        <h3>GO Annotations</h3>
        <h3>External links</h3>

        <h4>History:</h4>

        <p>Date created: 2017-03-03; Last updated: 2017-03-03</p>

    </div>;


export default Protein;
