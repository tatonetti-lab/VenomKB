import React from 'react';
import PropTypes from 'prop-types';

class LiteratureRef extends React.Component {
    render() {
        const {
            pmid,
            journalName,
            title
        } = this.props;

        return (
            <div className="item">
                <div>
                    {pmid}
                </div>
                <div className="middle aligned content">
                    {title}
                </div>
                <div>
                    {journalName}
                </div>
            </div>
        );
    }
}

LiteratureRef.propTypes = {
    pmid: PropTypes.string,
    journalName: PropTypes.string,
    title: PropTypes.string
};

export default LiteratureRef;
