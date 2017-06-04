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
                links.push(
                    <li>{key}: {outLinks[key].id}</li>
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
