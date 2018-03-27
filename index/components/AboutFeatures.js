import React from 'react';

const AboutFeatures = () =>
    <div className="jumbotron">
        <div className="container">
            <h2>Map of current and upcoming features</h2>
            <p>
                We are constantly working on adding new features to VenomKB. This page is meant to summarize the various features in VenomKB, as well as features that we are working on implementing in the near future.
            </p>
            <p>
                When we implement new features, we will also add an entry to the "News" panel on the home page. Check back frequently!
            </p>
            <h4> Color key:</h4>
            <ul>
                <li className="done">Currently implemented - green</li>
                <li className="inpr">Feature for next release - blue</li>
                <li className="todo">Planned feature - red</li>
            </ul>
            <div className="hr">
            </div>
            <h3>Website features</h3>
            <ul>
                <li>Species</li>
                <ul>
                    <li className="done">Taxonomy</li>
                    <li className="done">Known protein components</li>
                    <li className="done">Literature predications</li>
                </ul>
                <li>Proteins</li>
                <ul>
                    <li className="done">Source organism</li>
                    <li className="done">Free-text description (from ToxProt)</li>
                    <li className="done">Amino-acid sequence</li>
                    <li className="todo">DNA sequence</li>
                    <li className="done">Gene Ontology annotations</li>
                    <li className="done">Related publications</li>
                    <li className="done">Literature predications</li>
                    <li className="inpr">Links to external databases</li>
                </ul>
                <li>Genomes</li>
                <ul>
                    <li className="done">Link to species in VenomKB</li>
                    <li className="done">Link to sequencing project's homepage</li>
                </ul>
                <li>Miscellaneous</li>
                <ul>
                    <li className="todo">Website aggregate statistics</li>
                    <li className="inpr">Data provenance model</li>
                </ul>
            </ul>
            <div className="hr">
            </div>
            <h3>API features</h3>
            <ul>
                <li>Basic API features</li>
                <ul>
                    <li className="done">Index of all records</li>
                    <li className="done">Fetch JSON data corresponding to a VKBID</li>
                    <li className="done">Fetch all JSON data for all records of a given data type</li>
                </ul>
                <li>Semantic querying engine</li>
                <ul>
                    <li className="todo">Graph representation of VenomKB data</li>
                    <li className="todo">Simple, high-level language for semantic queries</li>
                    <li className="todo">Full user documentation</li>
                </ul>
            </ul>
        </div>
    </div>;

export default AboutFeatures;
