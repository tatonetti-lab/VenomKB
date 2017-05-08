import { connect } from 'react-redux';
import { removeProtein, updateProtein } from '../actions';
import ProteinDetail from '../components/ProteinDetail';
import { getProtein } from '../helpers/api_fetch';

/*
const getProteinFromVkbId = (id) => {
    /*
    proteins.forEach(curProtein => {
        if(curProtein.venomkb_id === id) {
            foundProtein = curProtein;
        }
    }, this);
    * /
    const foundProtein = getProtein(id);

    return foundProtein;
};
*/

const mapStateToProps = (state, props) => {
    const { index } = props.params;
    // const options = { mode: 'cors', method: 'GET' };

    // we have the VenomKB id; find the protein that goes with it
    // const singleProtein = getProteinFromVkbId(index);
    // ISSUE OCCURS HERE! NEED TO GET THE JSON OBJECT OUT OF THE PROMISE...
    // e.g., `singleProtein` is a promise, not a JSON object.

    // let proteinToReturn = {};
    const url = 'http://localhost:3001/proteins/'.concat(index);
    console.log(url);
    /*
    fetch(url, options).then(function(response) {
        // proteinToReturn = response.json();
        return response.json();
    }).then(function(myJson) {
        console.log(myJson);
    });
    */

    let proteinToReturn = {};
    getProtein(index).then(function(response) {
        if (response.status >= 400) {
            throw new Error('Bad response from API server');
        }
        return response[0];
    }).then(function(protein) {
        // console.log(JSON.stringify(protein));
        proteinToReturn = protein;
        return protein;
    });

    /*
    setTimeout(function() {
        console.log('Protein to return [PAUSED]: ', JSON.stringify(proteinToReturn));
    }, 2000);
    console.log('Protein to return: ', JSON.stringify(proteinToReturn));
    */

    /*
    return {
        protein: singleProtein
    };
    */
    setTimeout(function() {
        console.log('Protein to return: ', JSON.stringify(proteinToReturn));
        return {
            protein: proteinToReturn
        };
    }, 2000);
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
