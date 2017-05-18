import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import ProteinsVirtualized from './ProteinsVirtualized';

class Proteins extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            proteins: props.proteins,
            species: props.species,
            filteredProteins: []
        };
    }

    componentWillMount() {
        this.setState((prevState) => {
            return {
                proteins: prevState.proteins,
                filteredProteins: prevState.proteins
            };
        });
    }

    render() {
        const { proteins } = this.props;
        const numResults = proteins.length;

        return (
            <div>
                <h2>Search for VenomKB data</h2>
                <div id="proteins-body">
                    <div id="search-bar">
                        <SearchBar
                            allProteins={proteins}
                            proteinsToFilter={this.filteredProteins}
                            onChange={this.handleSearchChange}
                        />

                        <div className="checkbox-list" id="search-options">
                            <div id="num-results">{numResults} results found</div>
                        </div>
                    </div>
                    <div id="proteins-virtualized">
                        <div>
                            <ProteinsVirtualized
                                proteins={proteins}
                            />
                        </div>
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
    moveProtein: PropTypes.func
};

export default (Proteins);
