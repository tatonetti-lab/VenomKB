import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Column, Table, SortDirection, SortIndicator, AutoSizer } from 'react-virtualized';

import LinkButton from './LinkButton';

class ProteinsVirtualized extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            proteins: props.proteins,
            disableHeader: false,
            headerHeight: 30,
            height: 800,
            col1width: 100,
            col2width: 100,
            col3width: 500,
            col4width: 100,
            rowHeight: 45,
            rowCount: this.props.proteins.length,
            sortBy: 'name', // 'venomkb_id'
            sortDirection: SortDirection.DESC, // SortDirection.ASC
            useDynamicRowHeight: false
        };

        this._headerRenderer = this._headerRenderer.bind(this);
        this._isSortEnabled = this._isSortEnabled.bind(this);
        this._linkButtonRenderer = this._linkButtonRenderer.bind(this);
    }

    _linkButtonRenderer({ cellData }) {
        if(cellData === '') {
            return <div></div>;
        }

        return (
            <LinkButton
                linkedId={cellData}
            />
        );
    }

    _dataTypeRenderer({ cellData }) {
        if (cellData.charAt(0) === 'P') {
            return (
                <div>Protein</div>
            );
        }
        return (
            <div>Unknown</div>
        );
    }

    render() {
        return (
            <AutoSizer disableHeight>
                {({ width }) => (
                    <Table
                        disableHeader={this.state.disableHeader}
                        headerHeight={this.state.headerHeight}
                        width={width}
                        height={this.state.height}
                        rowCount={this.state.proteins.length}
                        rowGetter={({ index }) => this.state.proteins[index]}
                        rowHeight={this.state.rowHeight}
                    >
                        <Column
                            cellRenderer={this._linkButtonRenderer}
                            width={this.state.col1width}
                            dataKey="venomkb_id"
                            headerRenderer={this._headerRenderer}
                        />
                        <Column
                            label="VenomKB ID"
                            dataKey="venomkb_id"
                            width={this.state.col2width}
                            headerRenderer={this._headerRenderer}
                        />
                        <Column
                            label="Name"
                            dataKey="name"
                            width={this.state.col3width}
                            headerRenderer={this._headerRenderer}
                        />
                        <Column
                            label="Data type"
                            dataKey="venomkb_id"
                            width={this.state.col4width}
                            headerRenderer={this._headerRenderer}
                            cellRenderer={this._dataTypeRenderer}
                        />
                    </Table>
                )}
            </AutoSizer>
        );
    }

    _headerRenderer({
        dataKey,
        label,
        sortBy,
        sortDirection
    }) {
        let displaySortDirection = sortDirection === 'ASC' ? 'DESC' : 'ASC';
        return (
            <div>
                {label}
                {sortBy === dataKey &&
                    <SortIndicator sortDirection={displaySortDirection} />
                }
            </div>
        );
    }

    _isSortEnabled() {
        return true;
    }
}

ProteinsVirtualized.propTypes = {
    proteins: PropTypes.array
};

export default (ProteinsVirtualized);
