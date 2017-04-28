import React from 'react';
import Select from 'react-select';

let options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
];

let style = {
    paddingBottom: '15px'
};

const SearchBar = () =>
    <div style={style}>
        <Select
        	simpleValue
            name="form-field-name"
            options={options}
        />
    </div>;

export default SearchBar;
