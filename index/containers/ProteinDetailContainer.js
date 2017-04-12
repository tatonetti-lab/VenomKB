import { connect } from 'react-redux';
import { removeProtein, updateProtein } from '../actions';
import ProteinDetail from '../components/ProteinDetail';

const mapStateToProps = (state, props) => {
    const { index } = props.params;

    return {
        protein: state.proteins[index]
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRemove: (id) => dispatch(removeProtein(id)),
        updateProtein: (id, updates) =>
            dispatch(updateProtein(id, updates))
    };
};

const ProteinDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProteinDetail);

export default ProteinDetailContainer;
