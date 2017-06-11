import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';

class PredicationsBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const columns = [{
            Header: 'Subject',
            accessor: 's_name'
        }, {
            Header: 'Predicate',
            accessor: 'predicate'
        }, {
            Header: 'Object',
            accessor: 'o_name'
        }, {
            Header: 'PubMed ID',
            accessor: 'pmid'
        }];

        return (
            <div className="jdr-box">
                <h3>Literature predications</h3>
                <ReactTable
                    data={this.props.predications}
                    columns={columns}
                    showPagination={false}
                    defaultPageSize={this.props.predications.length}
                />
            </div>
        );
    }
}

PredicationsBox.propTypes = {
    predications: PropTypes.array.isRequired
};

export default PredicationsBox;
