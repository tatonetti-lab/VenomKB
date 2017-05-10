import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
// import { getProtein } from '../helpers/api_fetch';

// reducer for handling filter on displayed proteins
const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

// reducer for handling actions on list of all proteins
const proteins = (state = [], action) => {
    switch (action.type) {
        case types.ADD_PROTEIN_SUCCESS:
            return [action.protein, ...state];

        case types.REMOVE_PROTEIN_SUCCESS:
            return state.filter((t) => t._id !== action.todo._id );

        case types.UPDATE_PROTEIN_SUCCESS:
            const { updates, protein } = action;
            return state.map(t => {
                if (t._id === protein._id) {
                    return Object.assign({}, protein, updates);
                }
                return t;
            });

        case types.MOVE_PROTEIN:
            const newState = [...state];
            newState.splice(action.dragIndex, 1);
            return [
                ...newState.slice(0, action.hoverIndex),
                action.protein,
                ...newState.slice(action.hoverIndex)
            ];

        default:
            return state;
    }
};

// Set venomkb_id to a new value
function selectedProtein(state = 'P5453929', action) {
    switch (action.type) {
        case types.SELECT_PROTEIN:
            return action.venomkb_id;
        default:
            return state;
    }
}

function proteinDetail(state = {
    isFetching: false,
    json: {}
}, action) {
    switch (action.type) {
        case types.REQUEST_PROTEIN:
            console.log('CALLING proteinDetail() WITH REQUEST_PROTEIN');
            return Object.assign({}, state, {
                isFetching: true
            });
        case types.RECEIVE_PROTEIN:
            console.log('CALLING proteinDetail() WITH RECEIVE_PROTEIN');
            /* return Object.assign({}, state, {
                isFetching: false,
                json: action.json,
                lastUpdated: action.receivedAt
            });*/
            return Object.assign({}, state, action.json);
        default:
            console.log('RETURNING DEFAULT FROM proteinDetail()');
            return {
                isFetching: false,
                json: {'_id': '58feafa31e97c93b9878a6fd', 'description': null, 'out_links': {'CDD': {'db_obj': {'match status': '1', 'id': 'cd00190', 'entry name': 'Tryp_SPc'}, 'db_name': 'CDD', 'db_id': null}, 'Pfam': {'db_obj': {'match status': '1', 'id': 'PF00089', 'entry name': 'Trypsin'}, 'db_name': 'Pfam', 'db_id': null}, 'PRINTS': {'db_obj': {'id': 'PR00722', 'entry name': 'CHYMOTRYPSIN'}, 'db_name': 'PRINTS', 'db_id': null}, 'UniProtKB': {'db_obj': 'Q072L6', 'db_name': 'UniProtKB', 'db_id': null}, 'EMBL': {'db_obj': {'molecule type': 'mRNA', 'protein sequence ID': 'ABB76280.1', 'id': 'DQ247724'}, 'db_name': 'EMBL', 'db_id': null}, 'SUPFAM': {'db_obj': {'match status': '1', 'id': 'SSF50494', 'entry name': 'SSF50494'}, 'db_name': 'SUPFAM', 'db_id': null}, 'PROSITE': {'db_obj': {'match status': '1', 'id': 'PS00135', 'entry name': 'TRYPSIN_SER'}, 'db_name': 'PROSITE', 'db_id': null}, 'GO': {'db_obj': {'project': 'InterPro', 'term': 'F:serine-type endopeptidase activity', 'id': 'GO:0004252', 'evidence': 'ECO:0000501'}, 'db_name': 'GO', 'db_id': null}, 'SMART': {'db_obj': {'match status': '1', 'id': 'SM00020', 'entry name': 'Tryp_SPc'}, 'db_name': 'SMART', 'db_id': null}, 'InterPro': {'db_obj': {'id': 'IPR033116', 'entry name': 'TRYPSIN_SER'}, 'db_name': 'InterPro', 'db_id': null}}, 'aa_sequence': 'MVLIRVLANLLILQLSYAQKSSELVIGGDECNINEHRSLVVLFNSSGFLCAGTLVQDEWVLTAANCDSKNFQMQLGVHSKKVLNEDEQTRDPKEEASLCPNRKKDDEVDKDIMLIKLDSRVSNSEHIAPLSLPSSPPSVGSVCRIMGWGTISPTKETYPDVPHCANINILDHAVCRAAYPWQPVSSTTLCAGILQGGKDTCWGDSGGPLICNGEFQGIVSWGAHPCGQPHNPGVYTKVSDYTEWIKSIIAGNTAAACPP', 'venomkb_id': 'P5453929', 'venom_ref': 'V3691657', 'name': 'Thrombin-like enzyme asperase'},
                lastUpdated: Date.now()
            };
    }
}

function currentProtein(state = { }, action) {
    console.log(action);
    switch (action.type) {
        case types.RECEIVE_PROTEIN:
        case types.REQUEST_PROTEIN:
            return Object.assign({}, state, {
                json: proteinDetail(state[action.json], action)
            });
        default:
            console.log('RETURNING DEFAULT FROM currentProtein()');
            return {
                isFetching: false,
                json: {'_id': '58feafa31e97c93b9878a6fd', 'description': null, 'out_links': {'CDD': {'db_obj': {'match status': '1', 'id': 'cd00190', 'entry name': 'Tryp_SPc'}, 'db_name': 'CDD', 'db_id': null}, 'Pfam': {'db_obj': {'match status': '1', 'id': 'PF00089', 'entry name': 'Trypsin'}, 'db_name': 'Pfam', 'db_id': null}, 'PRINTS': {'db_obj': {'id': 'PR00722', 'entry name': 'CHYMOTRYPSIN'}, 'db_name': 'PRINTS', 'db_id': null}, 'UniProtKB': {'db_obj': 'Q072L6', 'db_name': 'UniProtKB', 'db_id': null}, 'EMBL': {'db_obj': {'molecule type': 'mRNA', 'protein sequence ID': 'ABB76280.1', 'id': 'DQ247724'}, 'db_name': 'EMBL', 'db_id': null}, 'SUPFAM': {'db_obj': {'match status': '1', 'id': 'SSF50494', 'entry name': 'SSF50494'}, 'db_name': 'SUPFAM', 'db_id': null}, 'PROSITE': {'db_obj': {'match status': '1', 'id': 'PS00135', 'entry name': 'TRYPSIN_SER'}, 'db_name': 'PROSITE', 'db_id': null}, 'GO': {'db_obj': {'project': 'InterPro', 'term': 'F:serine-type endopeptidase activity', 'id': 'GO:0004252', 'evidence': 'ECO:0000501'}, 'db_name': 'GO', 'db_id': null}, 'SMART': {'db_obj': {'match status': '1', 'id': 'SM00020', 'entry name': 'Tryp_SPc'}, 'db_name': 'SMART', 'db_id': null}, 'InterPro': {'db_obj': {'id': 'IPR033116', 'entry name': 'TRYPSIN_SER'}, 'db_name': 'InterPro', 'db_id': null}}, 'aa_sequence': 'MVLIRVLANLLILQLSYAQKSSELVIGGDECNINEHRSLVVLFNSSGFLCAGTLVQDEWVLTAANCDSKNFQMQLGVHSKKVLNEDEQTRDPKEEASLCPNRKKDDEVDKDIMLIKLDSRVSNSEHIAPLSLPSSPPSVGSVCRIMGWGTISPTKETYPDVPHCANINILDHAVCRAAYPWQPVSSTTLCAGILQGGKDTCWGDSGGPLICNGEFQGIVSWGAHPCGQPHNPGVYTKVSDYTEWIKSIIAGNTAAACPP', 'venomkb_id': 'P5453929', 'venom_ref': 'V3691657', 'name': 'Thrombin-like enzyme asperase'},
                lastUpdated: Date.now()
            };
    }
}

const rootReducer = combineReducers({
    proteins,
    filter,
    selectedProtein,
    currentProtein,
    routing
});

export default rootReducer;
