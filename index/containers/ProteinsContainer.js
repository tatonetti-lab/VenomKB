import { connect } from 'react-redux';
import { addProtein, removeProtein, updateProtein, moveProtein } from '../actions';
import { createSearchAction, getSearchSelectors } from 'redux-search';
import { createSelector } from 'reselect';
import Proteins from '../components/Proteins';

const proteins = state => state.resources.proteins;

const { text, result } = getSearchSelectors({
    resourceName: 'proteins',
    resourceSelector: (resourceName, state) => state.resources.proteins
});

const mapStateToProps = (state) => {
    return {
        proteins: state.resources.proteins,
        species: state.resources.species,
        selectors: createSelector(
            [result, proteins, text],
            (proteinIds, prots, searchText) => ({
                proteinIds,
                prots,
                searchText
            })
        )
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
