import React, { PropTypes } from 'react';
import Select from 'react-select';

const OPTIONS = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
];

class SearchBar extends React.Component {
    displayName='MultiSelectField';
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            crazy: false,
            options: OPTIONS,
            value: []
        };
    }
    handleSelectChange(value) {
        console.log('You\'ve selected:', value);
    }
    render() {
        return (
            <div className="section">
                <Select
                  multi
                  simpleValue
                  disabled={this.state.disabled}
                  value={this.state.value}
                  placeholder="Select your desired data element"
                  options={this.state.options}
                  onChange={this.handleSelectChange}
                />

            </div>
        );
    }
}

SearchBar.propTypes = {
    label: PropTypes.string
};

export default (SearchBar);
