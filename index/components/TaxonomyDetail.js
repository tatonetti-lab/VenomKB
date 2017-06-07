import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
const inferSpeciesType = (lineage) => {
    const taxa = lineage.map((taxon) =>
        taxon.taxonName
    );

    if (taxa.includes('Serpentes')) {
        return 'Snake';
    } else if (taxa.includes(''))
}
*/

class TaxonomyDetail extends Component {
    constructor(props) {
        super(props);

        // const species_type = inferSpeciesType(this.props.taxonomic_lineage);

        this.state = {
            taxonomic_lineage: props.taxonomic_lineage
        };

        this.hierarchyList = this.hierarchyList.bind(this);
    }

    hierarchyList = () => {
        const lineage = this.props.taxonomic_lineage;
        const lineageItems = lineage.map((taxon, index) =>
            <div>{Array(index).join(' ')}{taxon.rankName}: {taxon.taxonName}</div>
        );
        return lineageItems;
    }

    render() {
        return (
            <div>
                <pre className="taxonomy-detail">
                    {this.hierarchyList()}
                </pre>
            </div>
        );
    }
}

TaxonomyDetail.propTypes = {
    taxonomic_lineage: PropTypes.array
};

export default TaxonomyDetail;
