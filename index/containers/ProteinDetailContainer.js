import { connect } from 'react-redux';
import { removeProtein, updateProtein } from '../actions';
import ProteinDetail from '../components/ProteinDetail';
import { getProtein } from '../helpers/api_fetch';

const getProteinFromVkbId = (id) => {
    /*
    proteins.forEach(curProtein => {
        if(curProtein.venomkb_id === id) {
            foundProtein = curProtein;
        }
    }, this);
    */
    const foundProtein = getProtein(id);

    return foundProtein;
};

const mapStateToProps = (state, props) => {
    const { index } = props.params;

    // we have the VenomKB id; find the protein that goes with it
    const singleProtein = getProteinFromVkbId(index);
    // ISSUE OCCURS HERE! NEED TO GET THE JSON OBJECT OUT OF THE PROMISE...
    // e.g., `singleProtein` is a promise, not a JSON object.
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
