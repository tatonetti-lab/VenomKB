import React, { PropTypes } from 'react';
import Protein from './Protein';
import SearchBar from './SearchBar';

const handleMoveProtein = (proteins, moveProtein, indexes) => {
    const { dragIndex, hoverIndex } = indexes;

    return moveProtein(dragIndex, hoverIndex, proteins[dragIndex]);
};

class Proteins extends React.Component {
    render() {
        const { proteins, onRemoveProtein, updateProtein, moveProtein } = this.props;

        return (
            <div>
                <SearchBar
                    allProteins={proteins}
                />
                <div className="proteins">
                    {
                        <div>
                            { proteins.map((t, i) =>
                            <div>
                            <Protein
                                _id={t._id}
                                venomkb_id={t.venomkb_id}
                                name={t.name}
                                index={i}
                                onRemove={onRemoveProtein}
                                updateProtein={updateProtein}
                                moveProtein={(indexes) => {
                                    handleMoveProtein(proteins, moveProtein, indexes);
                                }}
                                {...t}/>
                            </div>)}
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
