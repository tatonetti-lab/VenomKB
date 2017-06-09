import React from 'react';
import PropTypes from 'prop-types';

class OutLinks extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            outLinks: props.links
        };
    }

    render() {
        const { outLinks } = this.state;
        const links = [];
        for (const key in outLinks) {
            if (outLinks.hasOwnProperty(key)) {
                const term = (outLinks[key].id === null) ? outLinks[key].attributes.name : outLinks[key].id;
                links.push(
                    <li>{key}: {term}</li>
                );
            }
        }

        return (
            <div>
                <ul>
                    {links}
                </ul>
            </div>
        );
    }
}

OutLinks.propTypes = {
    links: PropTypes.object
};

export default OutLinks;
