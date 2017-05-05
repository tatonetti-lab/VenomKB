import React, { PropTypes } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

const mapProteinIndexToSelect = (protein_idx) => {
    const select_data = protein_idx.map(obj => {
        const rObj = {
            label: obj.name,
            value: obj.venomkb_id,
            id: obj._id
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
            proteins: select_data,
            value: {}
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(value) {
        this.setState({ value }, () =>{
            console.log(value);
            // TODO: filter table
        });
    }

    render() {
        return (
            <div className="section">
                <VirtualizedSelect
                  name="venomkb-search"
                  options={this.state.proteins}
                  onChange={this.handleSelectChange}
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
