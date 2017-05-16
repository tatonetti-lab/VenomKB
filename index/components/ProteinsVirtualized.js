import { List } from 'immutable';
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
            col1width: 80,
            col2width: 120,
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
        this._sort = this._sort.bind(this);

        this.updateTable = this.updateTable.bind(this);
    }

    updateTable() {
        this.setState({ rowCount: this.props.proteins.length });
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
        const list = List(this.props.proteins);

        const sortedList = this._isSortEnabled()
            ? list
                .sortBy(item => item[this.state.sortBy])
                .update(l =>
                    this.state.sortDirection === SortDirection.ASC
                        ? l.reverse()
                        : l
                )
            : list;

        const rowGetter = ({ index }) => this._getDatum(sortedList, index);

        return (
            <AutoSizer disableHeight>
                {({ width }) => (
                    <Table
                        disableHeader={this.state.disableHeader}
                        headerHeight={this.state.headerHeight}
                        width={width}
                        height={this.state.height}
                        rowCount={this.state.proteins.length}
                        rowGetter={rowGetter}
                        rowHeight={this.state.rowHeight}
                        sort={this._sort}
                        sortBy={this.state.sortBy}
                        sortDirection={this.state.sortDirection}
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

    _getDatum(list, index) {
        return list.get(index % list.size);
    }

    _sort({ sortBy, sortDirection }) {
        this.setState({ sortBy, sortDirection });
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
