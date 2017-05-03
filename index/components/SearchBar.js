import React, { PropTypes } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

// import 'react-select/dist/react-select.css';
// import 'react-virtualized/styles.css';
// import 'react-virtualized-select/styles.css';

const mapProteinIndexToSelect = (protein_idx) => {
    const select_data = protein_idx.map(function(obj) {
        const rObj = {
            label: obj.name,
            value: obj.venomkb_id
        };
        return rObj;
    });

    return select_data;
};

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        const select_data = mapProteinIndexToSelect(props.allProteins);

        this.state = {
            proteins: select_data
        };
    }

    render() {
        /* const options = [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3, disabled: true }
        ]; */

        return (
            <div className="section">
                <VirtualizedSelect
                  name="venomkb-search"
                  options={this.state.proteins}
                  onChange={(selectValue) => this.setState({ selectValue })}
                  value={this.state.value}
                  placeholder="Begin typing to search for data records..."
                  noResultsText="No data found"
                  tabSelectsValue={false}
                  autoBlur
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    label: PropTypes.string,
    allProteins: PropTypes.array
};

export default (SearchBar);
