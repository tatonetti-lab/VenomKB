import React from 'react';
import PropTypes from 'prop-types';

import LiteratureRef from './LiteratureRef';

class LiteratureRefs extends React.Component {
    render() {
        const { refs } = this.props;

        const refsList = refs.map((ref) => (
            <LiteratureRef
                pmid={ref.pmid}
                journalName={ref.journal_name}
                title={ref.title}
            />
        ));

        refs.map((ref) => {
            console.log('PMID: ', ref.pmid);
            console.log('JOURNAL: ', ref.journal);
        });

        return (
            <div>
                {refsList}
            </div>
        );
    }
}

LiteratureRefs.propTypes = {
    refs: PropTypes.array
};

export default LiteratureRefs;
