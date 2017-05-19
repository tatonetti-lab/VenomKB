import React from 'react';
import PropTypes from 'prop-types';
// import SearchBar from './SearchBar';
import ProteinsVirtualized from './ProteinsVirtualized';

class Proteins extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            proteins: props.proteins,
            species: props.species,
        };
    }

    render() {
        return (
            <div>
                <h2>Search for VenomKB data</h2>
                <div id="proteins-virtualized">
                    <div>
                        <ProteinsVirtualized
                            proteins={this.state.proteins}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

Proteins.propTypes = {
    proteins: PropTypes.array,
    species: PropTypes.array,
    onAddProtein: PropTypes.func,
    onRemoveProtein: PropTypes.func,
    updateProtein: PropTypes.func,
    moveProtein: PropTypes.func,
    search: PropTypes.string
};

export default (Proteins);
