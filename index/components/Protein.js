import React from 'react';

const Protein = () =>
    <div>
        <h1>Protein</h1>
        <form>
            <div className="form-group">
                <input type="search" className="form-control" placeholder="Search" />
            </div>
        </form>
        <ul className="nav nav-tabs">
            <li className="active"><a href="#">Basic view</a></li>
            <li><a href="#">Tabular</a></li>
            <li><a href="#">Class view</a></li>
            <li><a href="#">Download <span className="glyphicon glyphicon-download-alt"></span></a></li>
        </ul>
        <img src="http://www.rcsb.org/pdb/images/2N8H_asym_r_250.jpg" className="pull-right float:right" />
        <h2>Mu-conotoxin GVIIJ</h2>
        <h3>VenomKB ID: P000000007</h3>
        <h4>Organism: <a href="#"><i>Conus geographicus</i> (Geography cone)</a></h4>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

        <div className="col-xs-12" style={{height: 20 + 'px'}}></div>
        <div>
            <h4>Sequence:</h4>
            <p>MKLTCVVIVA ALLLTACQLI TALDCGGTQK HRALRSTIKL SLLRQHRGWC GDPGATCGKL RLYCCSGFCD CYTKTCKDKS SA</p>
        </div>

        <h3>Molecular effects</h3>

        <h3>Systemic effects</h3>

        <h3>GO Annotations</h3>
        <h3>External links</h3>

        <h4>History:</h4>

        <p>Date created: 2017-03-03; Last updated: 2017-03-03</p>

    </div>;


export default Protein;
