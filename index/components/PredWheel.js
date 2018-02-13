import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { scaleOrdinal, schemeCategory20b } from 'd3-scale';
// import { max } from 'd3-array';
import { select } from 'd3-selection';
import { pie, arc } from 'd3';

// const data = [5, 10, 1, 3];
// const size = [500, 500];

class PredWheel extends Component {
    constructor(props) {
        super(props);
        this.createPredWheel = this.createPredWheel.bind(this);
    }

    componentDidMount() {
        this.createPredWheel();
    }

    componentDidUpdate() {
        this.createPredWheel();
    }

    createPredWheel() {
        /* const node = this.node;
        const dataMax = max(data);
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, size[1]]);
        select(node)
            .selectAll('rect')
            .data(data)
            .enter()
            .append('rect');
        select(node)
            .selectAll('rect')
            .data(data)
            .exit()
            .remove();
        select(node)
            .selectAll('rect')
            .data(data)
            .style('fill', '#fe9922')
            .attr('x', (d, i) => i * 25)
            .attr('y', d => size[1] - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25); */
        const dataset = [
            { label: 'Abulia', count: 10 },
            { label: 'Betelgeuse', count: 20 },
            { label: 'Cantaloupe', count: 30 },
            { label: 'Dijkstra', count: 40 }
        ];
        const node = this.node;
        const width = 256;
        const height = 256;
        const radius = Math.min(width, height) / 2;
        const color = scaleOrdinal(schemeCategory20b);

        select(node)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('align', 'center');
            // .attr('transform', 'translate(' + (width / 1) + ',' + (height / 1) + ')');
            // .append('g')
            // .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')');
        const arc1 = arc()
            .innerRadius(0)
            .outerRadius(radius);
        const pie1 = pie()
            .value(function s(d) { return d.count; })
            .sort(null);
        select(node)
            .selectAll('path')
            .data(pie1(dataset))
            .enter()
            .append('path')
            .attr('d', arc1)
            .attr('fill', function c(d) {
                return color(d.data.label);
            });
    }

    render() {
        return (
            <svg ref={node => this.node = node}
                 width={500}
                 height={500}>
            </svg>
        );
    }
}

export default PredWheel;
