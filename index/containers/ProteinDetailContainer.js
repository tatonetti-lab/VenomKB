import { connect } from 'react-redux';
import { removeProtein, updateProtein } from '../actions';
import ProteinDetail from '../components/ProteinDetail';

const mapStateToProps = (state, props) => {
    /*
    const { index } = props.params;
    let proteinToReturn = {};
    getProtein(index).then(function(response) {
        if (response.status >= 400) {
            throw new Error('Bad response from API server');
        }
        return response[0];
    }).then(function(protein) {
        proteinToReturn = protein;
        return protein;
    });

    setTimeout(function() {
        console.log('Protein to return: ', JSON.stringify(proteinToReturn));
        return {
            protein: proteinToReturn
        };
    }, 2000);
    */
    console.log('Correct Protein ID: ', props);

    return {
        protein: state.selectedProteinDetail
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
