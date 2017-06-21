import { List } from 'immutable';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Column, Table, SortDirection, SortIndicator, AutoSizer } from 'react-virtualized';

class DataVirtualized extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: props.data,
            filteredData: props.data,
            visibleTypes: {
                'P': true,
                'S': true
            },
            disableHeader: false,
            headerHeight: 30,
            height: 800,
            col1width: 50,
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

        this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);

        this._headerRenderer = this._headerRenderer.bind(this);
        this._idLinkRenderer = this._idLinkRenderer.bind(this);
        this._isSortEnabled = this._isSortEnabled.bind(this);
        this._linkButtonRenderer = this._linkButtonRenderer.bind(this);
        this._sort = this._sort.bind(this);
    }

    _linkButtonRenderer({cellData}) {
        if (cellData === '') {
            return <div></div>;
        }

        return (
            <div style={{'margin-left': '12px'}}>
                <input
                    type="checkbox"
                />
            </div>
        );
    }

    _idLinkRenderer({ cellData }) {
        return (
            <a href={cellData}>{cellData}</a>
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

    handleSearchChange(event) {
        const filteredData = this.state.data.filter( (entry) => {
            // Is the data type checked?
            let typeChecked = false;
            // For each data type...
            for (const thisDataType in this.state.visibleTypes) {
                // If that data type is visible...
                if (this.state.visibleTypes[thisDataType]) {
                    // Set to true if current item matches the data type
                    if (entry.venomkb_id.charAt(0) === thisDataType) {
                        typeChecked = true;
                    }
                }
            }

            if (event.target.value === '') {
                return typeChecked;
            }
            return (entry.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 && typeChecked);
        }, this);

        this.setState({
            search: event.target.value,
            filteredData: filteredData
        });
    }

    handleCheckboxChange(dataType) {
        // first, toggle the checkbox
        const changedTypes = this.state.visibleTypes;
        changedTypes[dataType] = !this.state.visibleTypes[dataType];
        this.setState({visibleTypes: changedTypes});

        // then, filter rows the same way we did in handleSearchChange
        const filteredData = this.state.data.filter((entry) => {
            let typeChecked = false;
            for (const thisDataType in this.state.visibleTypes) {
                if (this.state.visibleTypes[thisDataType]) {
                    if (entry.venomkb_id.charAt(0) === thisDataType) {
                        typeChecked = true;
                    }
                }
            }
            if (this.state.search === '') {
                return typeChecked;
            }
            return (entry.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1) && typeChecked;
        }, this);

        this.setState({
            filteredData: filteredData
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
                                onChange={this.handleSearchChange.bind(this)}
                            />
                            <div id="clear-input">
                                x
                            </div>
                        </div>
                        <div className="checkbox-list" style={{paddingTop: '5px'}}>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    className="checkbox-control"
                                    onChange={this.handleCheckboxChange.bind(this, 'S')}
                                    checked={this.state.visibleTypes.S}
                                />
                                <span className="checkbox-label">Show species</span>
                            </label>
                            <label className="checkbox-inline">
                                <input
                                    type="checkbox"
                                    className="checkbox-control"
                                    onChange={this.handleCheckboxChange.bind(this, 'P')}
                                    checked={this.state.visibleTypes.P}
                                />
                                <span className="checkbox-label">Show proteins</span>
                            </label>
                        <div id="num-results">{this.state.filteredData.length} results</div>
                    </div>

                    </div>

                </div>
                <AutoSizer disableHeight>
                    {({ width }) => (
                        <div>
                            <Table
                                ref="venomsTable"
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
                                    cellRenderer={this._idLinkRenderer}
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
