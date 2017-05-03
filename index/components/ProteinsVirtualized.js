import React, { PropTypes } from 'react';
import { Column, Table } from 'react-virtualized';

class ProteinsVirtualized extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            proteins: props.proteins,
            disableHeader: false,
            headerHeight: 30,
            height: 450,
            width: 400,
            col1width: 100,
            col2width: 100,
            rowHeight: 45
        };
    }

    render() {
        return (
            <Table
                width={this.state.width}
                height={this.state.height}
                rowCount={this.state.proteins.length}
                rowGetter={({ index }) => this.state.proteins[index]}
                rowHeight={this.state.rowHeight}
            >
                <Column
                    label="VenomKB ID"
                    dataKey="venomkb_id"
                    width={this.state.col1width}
                />
                <Column
                    label="Name"
                    dataKey="name"
                    width={this.state.col2width}
                />
            </Table>
        );
    }
}

ProteinsVirtualized.propTypes = {
    proteins: PropTypes.array
};

export default (ProteinsVirtualized);
