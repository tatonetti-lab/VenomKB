import { createStore, applyMiddleware, compose } from 'redux';
import { reduxSearch } from 'redux-search';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';

export default function configureStore(initialState) {
    // const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = compose(
        applyMiddleware(thunkMiddleware),
        reduxSearch({
            resourceIndexes: {
                proteins: ['venomkb_id', 'name'],
                species: ['venomkb_id', 'name']
            },
            resourceSelector: (resourceName, state) => {
                if (resourceName === 'proteins') {
                    return state.resources.proteins;
                }
                return state.resources.species;
            }
        }),
        DevTools.instrument()
    );

    const store = createStore(
        rootReducer,
        initialState,
        enhancer
    );

    return store;
}
