import { connect } from 'react-redux';
import { addProtein, removeProtein, updateProtein, moveProtein } from '../actions';
import Proteins from '../components/Proteins';

const mapStateToProps = (state) => {
    return {
        proteins: state.proteins
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAddProtein: (protein) => dispatch(addProtein(protein)),
        onRemoveProtein: (id) => dispatch(removeProtein(id)),
        updateProtein: (id, updates) =>
            dispatch(updateProtein(id, updates)),
        moveProtein: (dragIndex, hoverIndex, protein) =>
            dispatch(moveProtein(dragIndex, hoverIndex, protein))
    };
};

const ProteinsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Proteins);

export default ProteinsContainer;
