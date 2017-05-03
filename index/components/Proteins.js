import React, { PropTypes } from 'react';
import SearchBar from './SearchBar';
import ProteinsVirtualized from './ProteinsVirtualized';

/*
const handleMoveProtein = (proteins, moveProtein, indexes) => {
    const { dragIndex, hoverIndex } = indexes;

    return moveProtein(dragIndex, hoverIndex, proteins[dragIndex]);
};
*/

class Proteins extends React.Component {
    render() {
        const { proteins } = this.props;

        return (
            <div>
                <SearchBar
                    allProteins={proteins}
                />
                <div className="proteins">
                    {
                        <div>
                            <ProteinsVirtualized
                                proteins={proteins}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Proteins.propTypes = {
    proteins: PropTypes.array,
    onAddProtein: PropTypes.func,
    onRemoveProtein: PropTypes.func,
    updateProtein: PropTypes.func,
    moveProtein: PropTypes.func
};

export default (Proteins);
