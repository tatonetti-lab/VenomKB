import React, { PropTypes } from 'react';
import VirtualizedSelect from 'react-virtualized-select';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const options = [
            { label: 'One', value: 1 },
            { label: 'Two', value: 2 },
            { label: 'Three', value: 3, disabled: true }
        ];

        return (
            <div className="section">
                <VirtualizedSelect
                  options={options}
                  onChange={(selectValue) => this.setState({ selectValue })}
                  value={this.state.selectValue}
                />
            </div>
        );
    }
}

SearchBar.propTypes = {
    label: PropTypes.string
};

export default (SearchBar);
