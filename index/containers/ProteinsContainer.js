import { connect } from 'react-redux';
import { addProtein, removeProtein, updateProtein, moveProtein } from '../actions';
import { createSearchAction } from 'redux-search';
import Proteins from '../components/Proteins';

const mapStateToProps = (state) => {
    return {
        proteins: state.resources.proteins,
        species: state.resources.species,
        index: state.resources.index
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProtein: (protein) => dispatch(addProtein(protein)),
        onRemoveProtein: (id) => dispatch(removeProtein(id)),
        updateProtein: (id, updates) =>
            dispatch(updateProtein(id, updates)),
        moveProtein: (dragIndex, hoverIndex, protein) =>
            dispatch(moveProtein(dragIndex, hoverIndex, protein)),
        searchProtein: createSearchAction('proteins')
    };
};

const ProteinsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Proteins);

export default ProteinsContainer;
