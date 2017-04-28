import { connect } from 'react-redux';
import { removeProtein, updateProtein } from '../actions';
import ProteinDetail from '../components/ProteinDetail';

const getProteinFromVkbId = (proteins, id) => {
    let foundProtein;

    proteins.forEach(function(curProtein) {
        if(curProtein.venomkb_id === id) {
            foundProtein = curProtein;
        }
    }, this);
    // console.log(foundProtein);

    return foundProtein;
};

const mapStateToProps = (state, props) => {
    const { index } = props.params;
    // console.log(index);

    // we have the VenomKB id; find the protein that goes with it
    const singleProtein = getProteinFromVkbId(state.proteins, index);
    console.log(singleProtein);
    return {
        protein: singleProtein
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
