import { List } from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Column, Table, SortDirection, SortIndicator, AutoSizer } from 'react-virtualized';

import LinkButton from './LinkButton';

class DataVirtualized extends PureComponent {
    constructor(props) {
        super(props);

        this.data = props.data;

        this.state = {
            filteredData: this.data,
            disableHeader: false,
            headerHeight: 30,
            height: 800,
            col1width: 80,
            col2width: 120,
            col3width: 500,
            col4width: 100,
            rowHeight: 45,
            rowCount: this.props.data.length,
            sortBy: 'name', // 'venomkb_id'
            sortDirection: SortDirection.DESC, // SortDirection.ASC
            useDynamicRowHeight: false,
            search: ''
        };

        this._headerRenderer = this._headerRenderer.bind(this);
        this._isSortEnabled = this._isSortEnabled.bind(this);
        this._linkButtonRenderer = this._linkButtonRenderer.bind(this);
        this._sort = this._sort.bind(this);
    }

    _linkButtonRenderer({ cellData }) {
        if (cellData === '') {
            return <div></div>;
        }

        return (
            <LinkButton
                linkedId={cellData}
            />
        );
    }

    _dataTypeRenderer({ cellData }) {
        switch (cellData.charAt(0)) {
            case 'P':
                return (
                    <div>Protein</div>
                );
            case 'S':
                return (
                    <div>Species</div>
                );
            default:
                return (
                    <div>Unknown</div>
                );
        }
    }

    updateSearch(event) {
        const filtered = this.data.filter((test) => {
            return test.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1;
        });
        this.setState({
            search: event.target.value,
            filteredData: filtered
        });
    }

    render() {
        const list = List(this.state.filteredData);

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
            <div>
                <div id="search-bar-wrapper">
                    <div id="search">
                        <div id="search-control">
                            <input
                                className="input"
                                value={this.state.search}
                                onChange={this.updateSearch.bind(this)}
                            />
                            <div id="clear-input">
                                x
                            </div>
                        </div>
                    </div>
                </div>
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <div>
                            <Table
                                disableHeader={this.state.disableHeader}
                                headerHeight={this.state.headerHeight}
                                width={width}
                                height={this.state.height}
                                rowCount={this.state.filteredData.length}
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
                        </div>
                    )}
                </AutoSizer>
            </div>
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

DataVirtualized.propTypes = {
    data: PropTypes.array,
    search: PropTypes.string,
    filteredData: PropTypes.array
};

export default (DataVirtualized);
