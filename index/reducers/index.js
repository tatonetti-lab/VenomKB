import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

const filter = (state = '', action) => {
    switch (action.type) {
        case types.FILTER:
            return action.filter;
        default:
            return state;
    }
};

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

const rootReducer = combineReducers({
    proteins,
    filter,
    routing
});

export default rootReducer;
