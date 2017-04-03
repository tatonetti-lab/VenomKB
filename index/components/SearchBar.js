import React from 'react';
import Select from 'react-select';

let options = [
	{ value: 'one', label: 'One' },
	{ value: 'two', label: 'Two' }
];

const SearchBar = () =>
    <div>
        <Select
        	simpleValue
            name="form-field-name"
            options={options}
        />
    </div>;

export default SearchBar;
